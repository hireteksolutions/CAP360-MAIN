import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import { UserPlus, Shield, Trash2, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { z } from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const adminSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255)
    .transform((v) => v.toLowerCase())
    .refine((v) => !(/[\s,;]+/.test(v)), { message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(100),
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
});

const AdminManagement = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all admins
  const { data: admins, isLoading } = useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select('user_id, profiles(id, email, full_name)')
        .eq('role', 'admin');

      if (error) throw error;
      return userRoles;
    },
  });

  // Create admin mutation
  const createAdminMutation = useMutation({
    mutationFn: async (data: { email: string; password: string; fullName: string }) => {
      // Validate input
      const validationResult = adminSchema.safeParse(data);
      
      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        throw new Error(firstError.message);
      }

      const validated = validationResult.data;

      // Call secure Edge Function to create the user, profile and role using service role
      const { data: fnData, error: fnError } = await supabase.functions.invoke('create-admin-user', {
        body: {
          email: validated.email,
          password: validated.password,
          fullName: validated.fullName,
        },
      });

      if (fnError) {
        // Try to surface function error details if available (from Edge Function response body)
        let message = fnError.message || 'Failed to create admin';
        try {
          const resp = (fnError as any)?.context;
          if (resp && typeof resp.json === 'function') {
            const details = await resp.json();
            message = details?.error || details?.message || message;
          }
        } catch (_) {
          // no-op, fall back to generic message
        }
        throw new Error(message);
      }

      return fnData;
    },
    onSuccess: () => {
      toast({
        title: "Admin created successfully",
        description: "The new admin account has been created. They will receive a confirmation email.",
      });
      setEmail('');
      setPassword('');
      setFullName('');
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
    onError: (error: any) => {
      console.error('Error creating admin:', error);
      toast({
        title: "Error creating admin",
        description: error.message || "Failed to create admin account",
        variant: "destructive",
      });
    },
  });

  // Delete admin mutation
  const deleteAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Admin role revoked",
        description: "The admin access has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      setDeleteUserId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error revoking admin",
        description: error.message || "Failed to revoke admin access",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAdminMutation.mutateAsync({ email, password, fullName });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-12 px-4">
      <Helmet>
        <title>Admin Management - CAP 360</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin')}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Admin Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-logo-orange" />
                <CardTitle className="text-heading-teal">Create New Admin</CardTitle>
              </div>
              <CardDescription>
                Add a new administrator account to the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="admin@cap360.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-logo-orange hover:bg-logo-orange/90"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Admin Account"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Admin List Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-logo-green" />
                <CardTitle className="text-heading-teal">Current Admins</CardTitle>
              </div>
              <CardDescription>
                Manage existing administrator accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading admins...</p>
                </div>
              ) : admins && admins.length > 0 ? (
                <div className="space-y-3">
                  {admins.map((admin: any) => (
                    <div
                      key={admin.user_id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-logo-green" />
                        <div>
                          <p className="font-medium text-sm">{admin.profiles?.full_name || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{admin.profiles?.email || 'N/A'}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteUserId(admin.user_id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No admin accounts found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={(open) => !open && setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Admin Access?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove admin privileges from this user. They will no longer have access to the admin dashboard.
              This action can be reversed by re-adding the admin role.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUserId && deleteAdminMutation.mutate(deleteUserId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Revoke Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminManagement;
