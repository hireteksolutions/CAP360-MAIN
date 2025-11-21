import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  client_name: z.string().min(1, "Client name is required"),
  previous_position: z.string().min(1, "Previous position is required"),
  new_position: z.string().min(1, "New position is required"),
  company: z.string().min(1, "Company is required"),
  challenges: z.string().min(1, "Challenges are required"),
  solutions: z.string().min(1, "Solutions are required"),
  results: z.string().min(1, "Results are required"),
  timeline: z.string().min(1, "Timeline is required"),
  industry: z.string().min(1, "Industry is required"),
  rating: z.number().min(1).max(5),
  testimonial_quote: z.string().min(1, "Testimonial quote is required"),
  salary_increase_percentage: z.number().min(0).max(1000),
  story_date: z.string().min(1, "Story date is required"),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

interface SuccessStory extends FormData {
  id: string;
  created_at: string;
  updated_at: string;
}

export function SuccessStoriesForm() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client_name: "",
      previous_position: "",
      new_position: "",
      company: "",
      challenges: "",
      solutions: "",
      results: "",
      timeline: "",
      industry: "",
      rating: 5,
      testimonial_quote: "",
      salary_increase_percentage: 0,
      story_date: new Date().toISOString().split('T')[0],
      is_featured: false,
      is_published: true,
    },
  });

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from("success_stories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch success stories",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from("success_stories")
          .update(data)
          .eq("id", editingId);
        
        if (error) throw error;
        toast({ title: "Success", description: "Story updated successfully" });
      } else {
        const { error } = await supabase
          .from("success_stories")
          .insert(data as any);
        
        if (error) throw error;
        toast({ title: "Success", description: "Story created successfully" });
      }
      
      form.reset();
      setEditingId(null);
      fetchStories();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save story",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (story: SuccessStory) => {
    setEditingId(story.id);
    form.reset({
      ...story,
      story_date: story.story_date || new Date().toISOString().split('T')[0],
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    
    try {
      const { error } = await supabase
        .from("success_stories")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Story deleted successfully" });
      fetchStories();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete story",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? "Edit Success Story" : "Add New Success Story"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="client_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="previous_position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Position</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="new_position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Position</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeline</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 3 months" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (1-5)</FormLabel>
                      <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} Star{num > 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="salary_increase_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Increase (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="story_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Story Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="challenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenges</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="solutions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solutions</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="results"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Results</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="testimonial_quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial Quote</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Featured Story</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="is_published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Published</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : editingId ? "Update Story" : "Create Story"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Stories</h3>
        {stories.map((story) => (
          <Card key={story.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold">{story.client_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {story.previous_position} → {story.new_position} at {story.company}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Posted: {new Date(story.story_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {story.is_featured && <Badge variant="secondary">Featured</Badge>}
                  {!story.is_published && <Badge variant="destructive">Draft</Badge>}
                  <div className="flex">
                    {Array.from({ length: story.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm mb-4">{story.testimonial_quote}</p>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(story)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(story.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}