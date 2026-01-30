import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Upload, Trash2, Eye, EyeOff, Play, Loader2, Plus, TrendingUp, Pencil, Link as LinkIcon, X } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Testimonial {
  id: string;
  client_name: string;
  client_role_before: string;
  client_company_before: string | null;
  client_role_after: string;
  client_company_after: string | null;
  salary_increase_percentage: number | null;
  video_path: string | null;
  youtube_url: string | null;
  thumbnail_path: string | null;
  quote: string | null;
  industry: string | null;
  is_published: boolean;
  created_at: string;
}

interface FormData {
  client_name: string;
  client_role_before: string;
  client_company_before: string;
  client_role_after: string;
  client_company_after: string;
  salary_increase_percentage: string;
  quote: string;
  industry: string;
  youtube_url: string;
}

// Helper to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export default function CAP360TestimonialsManagement() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoMethod, setVideoMethod] = useState<'upload' | 'youtube'>('upload');
  const [formData, setFormData] = useState<FormData>({
    client_name: '',
    client_role_before: '',
    client_company_before: '',
    client_role_after: '',
    client_company_after: '',
    salary_increase_percentage: '',
    quote: '',
    industry: '',
    youtube_url: '',
  });

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['cap360-testimonials-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cap360_testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const getMediaUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('testimonial-videos')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  };

  const createMutation = useMutation({
    mutationFn: async () => {
      setIsUploading(true);
      let videoPath = null;
      let youtubeUrl = null;

      // Handle video based on method
      if (videoMethod === 'upload' && selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('testimonial-videos')
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;
        videoPath = fileName;
      } else if (videoMethod === 'youtube' && formData.youtube_url) {
        youtubeUrl = formData.youtube_url;
      }

      // Insert testimonial record
      const { error } = await supabase
        .from('cap360_testimonials')
        .insert({
          client_name: formData.client_name,
          client_role_before: formData.client_role_before,
          client_company_before: formData.client_company_before || null,
          client_role_after: formData.client_role_after,
          client_company_after: formData.client_company_after || null,
          salary_increase_percentage: formData.salary_increase_percentage ? parseInt(formData.salary_increase_percentage) : null,
          quote: formData.quote || null,
          industry: formData.industry || null,
          video_path: videoPath,
          youtube_url: youtubeUrl,
          is_published: false,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cap360-testimonials-admin'] });
      toast.success('Testimonial created successfully!');
      closeDialog();
    },
    onError: (error: any) => {
      toast.error(`Error creating testimonial: ${error.message}`);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editingTestimonial) return;
      setIsUploading(true);
      
      let videoPath = editingTestimonial.video_path;
      let youtubeUrl = editingTestimonial.youtube_url;

      // Handle video based on method
      if (videoMethod === 'upload') {
        if (selectedFile) {
          // Delete old video if exists
          if (editingTestimonial.video_path) {
            await supabase.storage
              .from('testimonial-videos')
              .remove([editingTestimonial.video_path]);
          }
          
          const fileExt = selectedFile.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('testimonial-videos')
            .upload(fileName, selectedFile);

          if (uploadError) throw uploadError;
          videoPath = fileName;
          youtubeUrl = null; // Clear YouTube URL when uploading file
        }
      } else if (videoMethod === 'youtube') {
        youtubeUrl = formData.youtube_url || null;
        // If switching to YouTube, delete old uploaded video
        if (editingTestimonial.video_path && formData.youtube_url) {
          await supabase.storage
            .from('testimonial-videos')
            .remove([editingTestimonial.video_path]);
          videoPath = null;
        }
      }

      // Update testimonial record
      const { error } = await supabase
        .from('cap360_testimonials')
        .update({
          client_name: formData.client_name,
          client_role_before: formData.client_role_before,
          client_company_before: formData.client_company_before || null,
          client_role_after: formData.client_role_after,
          client_company_after: formData.client_company_after || null,
          salary_increase_percentage: formData.salary_increase_percentage ? parseInt(formData.salary_increase_percentage) : null,
          quote: formData.quote || null,
          industry: formData.industry || null,
          video_path: videoPath,
          youtube_url: youtubeUrl,
        })
        .eq('id', editingTestimonial.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cap360-testimonials-admin'] });
      toast.success('Testimonial updated successfully!');
      closeDialog();
    },
    onError: (error: any) => {
      toast.error(`Error updating testimonial: ${error.message}`);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      // Delete video from storage if exists
      if (testimonial.video_path) {
        await supabase.storage
          .from('testimonial-videos')
          .remove([testimonial.video_path]);
      }

      // Delete record from database
      const { error } = await supabase
        .from('cap360_testimonials')
        .delete()
        .eq('id', testimonial.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cap360-testimonials-admin'] });
      toast.success('Testimonial deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(`Error deleting testimonial: ${error.message}`);
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from('cap360_testimonials')
        .update({ is_published: !is_published })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cap360-testimonials-admin'] });
      toast.success('Status updated!');
    },
    onError: (error: any) => {
      toast.error(`Error updating status: ${error.message}`);
    },
  });

  const resetForm = () => {
    setFormData({
      client_name: '',
      client_role_before: '',
      client_company_before: '',
      client_role_after: '',
      client_company_after: '',
      salary_increase_percentage: '',
      quote: '',
      industry: '',
      youtube_url: '',
    });
    setSelectedFile(null);
    setVideoMethod('upload');
    setEditingTestimonial(null);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      client_role_before: testimonial.client_role_before,
      client_company_before: testimonial.client_company_before || '',
      client_role_after: testimonial.client_role_after,
      client_company_after: testimonial.client_company_after || '',
      salary_increase_percentage: testimonial.salary_increase_percentage?.toString() || '',
      quote: testimonial.quote || '',
      industry: testimonial.industry || '',
      youtube_url: testimonial.youtube_url || '',
    });
    setVideoMethod(testimonial.youtube_url ? 'youtube' : 'upload');
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name || !formData.client_role_before || !formData.client_role_after) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (editingTestimonial) {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin-management')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">CAP360 Testimonials</h1>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) closeDialog();
            else setIsDialogOpen(true);
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? 'Edit CAP360 Testimonial' : 'Add New CAP360 Testimonial'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Client Info */}
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="client_name">Client Name *</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                      placeholder="Technology, Finance, Healthcare..."
                    />
                  </div>
                </div>

                {/* Before Section */}
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">Before CAP360</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="client_role_before">Role/Position *</Label>
                      <Input
                        id="client_role_before"
                        value={formData.client_role_before}
                        onChange={(e) => setFormData(prev => ({ ...prev, client_role_before: e.target.value }))}
                        placeholder="Senior Developer"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client_company_before">Company</Label>
                      <Input
                        id="client_company_before"
                        value={formData.client_company_before}
                        onChange={(e) => setFormData(prev => ({ ...prev, client_company_before: e.target.value }))}
                        placeholder="Previous Company"
                      />
                    </div>
                  </div>
                </div>

                {/* After Section */}
                <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">After CAP360</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="client_role_after">Role/Position *</Label>
                      <Input
                        id="client_role_after"
                        value={formData.client_role_after}
                        onChange={(e) => setFormData(prev => ({ ...prev, client_role_after: e.target.value }))}
                        placeholder="Engineering Manager"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client_company_after">Company</Label>
                      <Input
                        id="client_company_after"
                        value={formData.client_company_after}
                        onChange={(e) => setFormData(prev => ({ ...prev, client_company_after: e.target.value }))}
                        placeholder="New Company"
                      />
                    </div>
                  </div>
                </div>

                {/* Salary Increase */}
                <div>
                  <Label htmlFor="salary_increase">Salary Increase (%)</Label>
                  <Input
                    id="salary_increase"
                    type="number"
                    value={formData.salary_increase_percentage}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary_increase_percentage: e.target.value }))}
                    placeholder="45"
                    min="0"
                    max="500"
                  />
                </div>

                {/* Quote */}
                <div>
                  <Label htmlFor="quote">Testimonial Quote</Label>
                  <Textarea
                    id="quote"
                    value={formData.quote}
                    onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                    placeholder="Share their experience..."
                    rows={3}
                  />
                </div>

                {/* Video Section with Tabs */}
                <div>
                  <Label>Testimonial Video</Label>
                  <Tabs value={videoMethod} onValueChange={(v) => setVideoMethod(v as 'upload' | 'youtube')} className="mt-2">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Video
                      </TabsTrigger>
                      <TabsTrigger value="youtube" className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        YouTube Link
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upload" className="mt-4">
                      <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {selectedFile 
                            ? selectedFile.name 
                            : editingTestimonial?.video_path 
                              ? 'Replace current video (MP4, WebM)' 
                              : 'Click to upload video (MP4, WebM)'}
                        </span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                      {editingTestimonial?.video_path && !selectedFile && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Current video: {editingTestimonial.video_path}
                        </p>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="youtube" className="mt-4">
                      <Input
                        value={formData.youtube_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, youtube_url: e.target.value }))}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      {formData.youtube_url && getYouTubeVideoId(formData.youtube_url) && (
                        <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-muted">
                          <img
                            src={getYouTubeThumbnail(formData.youtube_url) || ''}
                            alt="YouTube thumbnail preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {editingTestimonial ? 'Updating...' : 'Uploading...'}
                      </>
                    ) : (
                      editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                {/* Video Preview */}
                <div className="aspect-video bg-muted relative">
                  {testimonial.youtube_url ? (
                    <>
                      <img
                        src={getYouTubeThumbnail(testimonial.youtube_url) || ''}
                        alt={`${testimonial.client_name} testimonial`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" fill="currentColor" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-xs rounded">
                        YouTube
                      </span>
                    </>
                  ) : testimonial.video_path ? (
                    <>
                      <video
                        src={getMediaUrl(testimonial.video_path)}
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Play className="h-10 w-10 text-white" fill="currentColor" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">No video</span>
                    </div>
                  )}
                  
                  {/* Published Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    testimonial.is_published 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-yellow-500/90 text-white'
                  }`}>
                    {testimonial.is_published ? 'Published' : 'Draft'}
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.client_name}</h3>
                    {testimonial.industry && (
                      <span className="text-xs text-muted-foreground">{testimonial.industry}</span>
                    )}
                  </div>

                  {/* Before/After Summary */}
                  <div className="text-sm space-y-1">
                    <p className="text-red-500">From: {testimonial.client_role_before}</p>
                    <p className="text-green-500">To: {testimonial.client_role_after}</p>
                  </div>

                  {testimonial.salary_increase_percentage && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{testimonial.salary_increase_percentage}% salary increase</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(testimonial)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublishMutation.mutate({ id: testimonial.id, is_published: testimonial.is_published })}
                    >
                      {testimonial.is_published ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Publish
                        </>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this testimonial?')) {
                          deleteMutation.mutate(testimonial);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No testimonials yet. Add your first one!</p>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}