import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Users, MessageSquare, Calendar, CreditCard, LogOut, User, Star, FileText, Trash2, Shield, Image } from "lucide-react";import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthProvider";
import { SuccessStoriesForm } from "./SuccessStoriesForm";
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [resumeAudits, setResumeAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch contacts
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch consultations
      const { data: consultationsData, error: consultationsError } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch resume audit requests
      const { data: resumeAuditsData, error: resumeAuditsError } = await supabase
        .from('resume_audit_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError || consultationsError || paymentsError || resumeAuditsError) {
        console.error('Fetch errors:', { contactsError, consultationsError, paymentsError, resumeAuditsError });
        throw new Error('Failed to fetch data');
      }

      setContacts(contactsData || []);
      setConsultations(consultationsData || []);
      setPayments(paymentsData || []);
      setResumeAudits(resumeAuditsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = (data: any[], filename: string, sheetName: string) => {
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Convert data to worksheet
      const ws = XLSX.utils.json_to_sheet(data);
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      
      // Generate and download the file
      XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Success!",
        description: `${filename} exported successfully.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportAllData = () => {
    try {
      const wb = XLSX.utils.book_new();
      
      // Add contacts sheet
      if (contacts.length > 0) {
        const contactsWS = XLSX.utils.json_to_sheet(contacts);
        XLSX.utils.book_append_sheet(wb, contactsWS, "Contacts");
      }
      
      // Add consultations sheet
      if (consultations.length > 0) {
        const consultationsWS = XLSX.utils.json_to_sheet(consultations);
        XLSX.utils.book_append_sheet(wb, consultationsWS, "Consultations");
      }
      
      // Add payments sheet
      if (payments.length > 0) {
        const paymentsWS = XLSX.utils.json_to_sheet(payments);
        XLSX.utils.book_append_sheet(wb, paymentsWS, "Payments");
      }

      // Add resume audits sheet
      if (resumeAudits.length > 0) {
        const resumeAuditsWS = XLSX.utils.json_to_sheet(resumeAudits);
        XLSX.utils.book_append_sheet(wb, resumeAuditsWS, "Resume Audits");
      }
      
      XLSX.writeFile(wb, `CAPtivate_All_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Success!",
        description: "All data exported successfully.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Error",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadResume = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('resume-audits')
        .download(filePath);

      if (error) {
        throw error;
      }

      // Create blob URL and download
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName || 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Success!",
        description: "Resume downloaded successfully.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
  };

  const updateResumeAuditStatus = async (auditId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('resume_audit_requests')
        .update({ status: newStatus })
        .eq('id', auditId);

      if (error) {
        throw error;
      }

      // Update local state
      setResumeAudits(prev => 
        prev.map((audit: any) => 
          audit.id === auditId ? { ...audit, status: newStatus } : audit
        )
      );

      toast({
        title: "Success!",
        description: "Status updated successfully.",
      });
    } catch (error) {
      console.error('Update status error:', error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;

      setContacts(prev => prev.filter((contact: any) => contact.id !== contactId));
      toast({
        title: "Success!",
        description: "Contact deleted successfully.",
      });
    } catch (error) {
      console.error('Delete contact error:', error);
      toast({
        title: "Error",
        description: "Failed to delete contact. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteConsultation = async (consultationId: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .delete()
        .eq('id', consultationId);

      if (error) throw error;

      setConsultations(prev => prev.filter((consultation: any) => consultation.id !== consultationId));
      toast({
        title: "Success!",
        description: "Consultation deleted successfully.",
      });
    } catch (error) {
      console.error('Delete consultation error:', error);
      toast({
        title: "Error",
        description: "Failed to delete consultation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deletePayment = async (paymentId: string) => {
    try {
      const { error } = await supabase
        .from('payments')
        .delete()
        .eq('id', paymentId);

      if (error) throw error;

      setPayments(prev => prev.filter((payment: any) => payment.id !== paymentId));
      toast({
        title: "Success!",
        description: "Payment record deleted successfully.",
      });
    } catch (error) {
      console.error('Delete payment error:', error);
      toast({
        title: "Error",
        description: "Failed to delete payment record. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteResumeAudit = async (auditId: string) => {
    try {
      const { error } = await supabase
        .from('resume_audit_requests')
        .delete()
        .eq('id', auditId);

      if (error) throw error;

      setResumeAudits(prev => prev.filter((audit: any) => audit.id !== auditId));
      toast({
        title: "Success!",
        description: "Resume audit request deleted successfully.",
      });
    } catch (error) {
      console.error('Delete resume audit error:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume audit request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <div className="flex items-center text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span>Welcome, {user?.email}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate('/admin/management')}
              className="bg-logo-orange hover:bg-logo-orange/90 text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              Manage Admins
            </Button>
            <Button 
              onClick={() => navigate('/admin/media')}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Image className="h-4 w-4 mr-2" />
              Media Gallery
            </Button>
            <Button 
              onClick={exportAllData}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-gold-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-primary">{contacts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-gold-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Consultations</p>
                  <p className="text-2xl font-bold text-primary">{consultations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-gold-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Payments</p>
                  <p className="text-2xl font-bold text-primary">{payments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-gold-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Resume Audits</p>
                  <p className="text-2xl font-bold text-primary">{resumeAudits.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="resume-audits">Resume Audits</TabsTrigger>
            <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <CardDescription>Users who submitted the contact form</CardDescription>
                </div>
                <Button 
                  onClick={() => exportToExcel(contacts, "Contacts", "Contacts")}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Contacts
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Career Level</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact: any) => (
                        <TableRow key={contact.id}>
                          <TableCell>{contact.first_name} {contact.last_name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone || 'N/A'}</TableCell>
                          <TableCell>{contact.service || 'N/A'}</TableCell>
                          <TableCell>{contact.career_level || 'N/A'}</TableCell>
                          <TableCell>{formatDate(contact.created_at)}</TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this contact? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteContact(contact.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Consultation Requests</CardTitle>
                  <CardDescription>Users who requested free consultations</CardDescription>
                </div>
                <Button 
                  onClick={() => exportToExcel(consultations, "Consultations", "Consultations")}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Consultations
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Current Position</TableHead>
                        <TableHead>Preferred Date</TableHead>
                        <TableHead>Preferred Time</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultations.map((consultation: any) => (
                        <TableRow key={consultation.id}>
                          <TableCell>{consultation.name}</TableCell>
                          <TableCell>{consultation.email}</TableCell>
                          <TableCell>{consultation.phone || 'N/A'}</TableCell>
                          <TableCell>{consultation.current_position || 'N/A'}</TableCell>
                          <TableCell>{consultation.preferred_date || 'N/A'}</TableCell>
                          <TableCell>{consultation.preferred_time || 'N/A'}</TableCell>
                          <TableCell>{formatDate(consultation.created_at)}</TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Consultation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this consultation request? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteConsultation(consultation.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Payment Submissions</CardTitle>
                  <CardDescription>Users who submitted payment information</CardDescription>
                </div>
                <Button 
                  onClick={() => exportToExcel(payments, "Payments", "Payments")}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Payments
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment: any) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.full_name}</TableCell>
                          <TableCell>{payment.email}</TableCell>
                          <TableCell>{payment.package_name}</TableCell>
                          <TableCell>{payment.package_price}</TableCell>
                          <TableCell className="capitalize">{payment.payment_method}</TableCell>
                          <TableCell>{formatDate(payment.created_at)}</TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Payment Record</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this payment record? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deletePayment(payment.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume-audits">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Resume Audit Requests</CardTitle>
                  <CardDescription>Users who submitted resumes for free audits</CardDescription>
                </div>
                <Button 
                  onClick={() => exportToExcel(resumeAudits, "Resume_Audits", "Resume Audits")}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Resume Audits
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Current Position</TableHead>
                        <TableHead>Target Position</TableHead>
                         <TableHead>Experience</TableHead>
                         <TableHead>CTC</TableHead>
                         <TableHead>Status</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resumeAudits.map((audit: any) => (
                        <TableRow key={audit.id}>
                          <TableCell>{audit.name}</TableCell>
                          <TableCell>{audit.email}</TableCell>
                          <TableCell>{audit.phone || 'N/A'}</TableCell>
                          <TableCell>{audit.current_position || 'N/A'}</TableCell>
                          <TableCell>{audit.target_position || 'N/A'}</TableCell>
                           <TableCell>{audit.experience_years || 'N/A'}</TableCell>
                           <TableCell>{audit.ctc || 'N/A'}</TableCell>
                           <TableCell>
                            <Select 
                              value={audit.status || 'pending'} 
                              onValueChange={(value) => updateResumeAuditStatus(audit.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {audit.resume_file_path ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadResume(audit.resume_file_path, `${audit.name}_resume`)}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            ) : (
                              'No file'
                            )}
                          </TableCell>
                          <TableCell>{formatDate(audit.created_at)}</TableCell>
                          <TableCell>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Resume Audit</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this resume audit request? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteResumeAudit(audit.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="success-stories">
            <Card>
              <CardHeader>
                <CardTitle>Success Stories Management</CardTitle>
                <CardDescription>Manage client success stories and testimonials</CardDescription>
              </CardHeader>
              <CardContent>
                <SuccessStoriesForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
