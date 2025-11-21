import React, { useRef, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaProps {
  onVerify: (token: string | null) => void;
  onExpire?: () => void;
  size?: 'compact' | 'normal' | 'invisible';
  theme?: 'light' | 'dark';
}

export const Captcha: React.FC<CaptchaProps> = ({
  onVerify,
  onExpire,
  size = 'normal',
  theme = 'light'
}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = useCallback((token: string | null) => {
    onVerify(token);
  }, [onVerify]);

  const handleExpire = useCallback(() => {
    onVerify(null);
    onExpire?.();
  }, [onVerify, onExpire]);

  // Use a test site key for development - replace with your actual site key in production
  const siteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // This is Google's test key

  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleChange}
        onExpired={handleExpire}
        size={size}
        theme={theme}
      />
    </div>
  );
};

export default Captcha;