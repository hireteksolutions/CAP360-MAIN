import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Trash2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MediaManagement() {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: mediaItems, isLoading } = useQuery({
    queryKey: ['media-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile) throw new Error('No file selected');

      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('media-gallery')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Create metadata record
      const fileType = selectedFile.type.startsWith('video/') ? 'video' : 'image';
      const { error: dbError } = await supabase
        .from('media_gallery')
        .insert({
          file_path: filePath,
          file_type: fileType,
          mime_type: selectedFile.type,
          file_size: selectedFile.size,
          title: title || selectedFile.name,
        });

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Media uploaded successfully',
      });
      setSelectedFile(null);
      setTitle('');
      queryClient.invalidateQueries({ queryKey: ['media-gallery'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: { id: string; file_path: string }) => {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media-gallery')
        .remove([item.file_path]);

      if (storageError) throw storageError;

      // Delete metadata
      const { error: dbError } = await supabase
        .from('media_gallery')
        .delete()
        .eq('id', item.id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Media deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['media-gallery'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async (item: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from('media_gallery')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-gallery'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    await uploadMutation.mutateAsync();
    setUploading(false);
  };

  const getMediaUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('media-gallery')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/admin')}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold mb-2">Media Management</h1>
          <p className="text-muted-foreground">
            Upload and manage photos and videos for the gallery
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload New Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file">Select File (Image or Video)</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedFile.name} (
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for this media"
                />
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uploaded Media</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              </div>
            ) : !mediaItems || mediaItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No media uploaded yet
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-muted rounded-md overflow-hidden mb-3">
                        {item.file_type === 'video' ? (
                          <video
                            src={getMediaUrl(item.file_path)}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={getMediaUrl(item.file_path)}
                            alt={item.title || 'Gallery image'}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <h3 className="font-semibold mb-2 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.file_type === 'video' ? '🎥 Video' : '📷 Image'}
                        {' • '}
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePublishMutation.mutate(item)}
                          disabled={togglePublishMutation.isPending}
                        >
                          {item.is_published ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Hide
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Show
                            </>
                          )}
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            deleteMutation.mutate({
                              id: item.id,
                              file_path: item.file_path,
                            })
                          }
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
