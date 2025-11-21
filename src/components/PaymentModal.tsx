
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, DollarSign, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  children: React.ReactNode;
  packageName: string;
  packagePrice: string;
  packageFeatures: string[];
}

const PaymentModal = ({ children, packageName, packagePrice, packageFeatures }: PaymentModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    contactNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Only save non-sensitive data to database
      const { data, error } = await supabase
        .from('payments')
        .insert([
          {
            email: formData.email,
            full_name: formData.fullName,
            package_name: packageName,
            package_price: packagePrice,
            payment_method: paymentMethod,
            billing_address: formData.billingAddress,
            city: formData.city,
            zip_code: formData.zipCode,
            country: formData.country,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Order Submitted!",
        description: `Your order for ${packageName} package has been submitted. We'll process it and contact you soon.`,
      });

      // Reset form
      setFormData({
        email: "",
        fullName: "",
        contactNumber: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        billingAddress: "",
        city: "",
        zipCode: "",
        country: "",
      });
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-logo-blue flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-gold-500" />
            Complete Your Order - {packageName} Package
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Secure payment processing for your {packageName} resume package ({packagePrice})
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-gold-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-logo-blue mb-2">Order Summary:</h4>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">{packageName} Resume Package</span>
            <span className="font-bold text-logo-blue">{packagePrice}</span>
          </div>
          <ul className="text-sm text-gray-600 mt-2">
            {packageFeatures.slice(0, 3).map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
            {packageFeatures.length > 3 && <li>• And {packageFeatures.length - 3} more features...</li>}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-logo-blue">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-logo-blue">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-logo-blue">Contact Number *</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-logo-blue">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  PayPal
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-logo-blue">Card Number *</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="text-logo-blue">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv" className="text-logo-blue">CVV *</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-logo-blue">Billing Address</Label>
                <Input
                  name="billingAddress"
                  type="text"
                  placeholder="Street address"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="zipCode"
                    type="text"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Lock className="h-4 w-4" />
              Your payment information is secure and encrypted
            </div>
            <p className="text-xs text-gray-500">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-gold-500 hover:bg-gold-600 text-white"
            >
              {isSubmitting ? "Processing..." : `Complete Payment ${packagePrice}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
