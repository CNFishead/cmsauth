export default interface UserType {
  _id: string;
  firstName: string;
  lastName?: string;
  agentCode?: string;
  businessInfo?: {
    name: string;
    missionStatement: string;
    logoUrl: string;
    businessSlug: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    email: string;
    phone: string;
    ein: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  servicePageOptions?: {
    predeterminedAmounts: string[];
  };
  businessSlug: string;
  agent?: string;
  status: 'pending' | 'active' | 'inactive' | 'deleted';
  phoneNumber: string;
  fullName: string;
  paymentGateways: {
    nmi?: {
      merchant_id: string;
      merchant_pass: string;
      security_key: string;
    };
    payNetWorx?: {
      merchantUser: string;
      merchantPass: string;
    };
    payBright?: {
      source_key: string;
      pin: string;
    };
  };
  email: string;
  password: string;
  isEmailVerified: boolean;
  passwordResetToken: string;
  passwordResetExpires: Date;
  emailVerificationToken: string;
  emailVerificationExpires: Date;
  role: [string];
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
