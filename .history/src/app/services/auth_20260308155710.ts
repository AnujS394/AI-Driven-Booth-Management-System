import { UserData } from "../context/UserContext";

export interface LoginCredentials {
  identifier: string; // email or phone
  password: string;
}

// mock user data; in a real app you'd call an API
const mockUser: UserData = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@campaign.in",
  phone: "+91 98765 43210",
  role: "Campaign Manager",
  constituency: "North Delhi",
  party: "ABC Party",
  address: "123 Parliament Street, New Delhi",
  bio: "Experienced campaign manager with 15+ years in political operations and grassroots mobilization. Specialized in data-driven campaign strategies and voter outreach programs.",
  twitter: "https://twitter.com/admin",
  linkedin: "https://linkedin.com/in/admin",
  facebook: "https://facebook.com/admin",
  memberSince: "January 2024",
  location: "North Delhi, India",
  photoUrl: "",
};

export async function login({ identifier, password }: LoginCredentials): Promise<UserData> {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 400));

  // simple credential check
  const validIdentifier =
    identifier === mockUser.email || identifier === mockUser.phone;
  const validPassword = password === "password";

  if (validIdentifier && validPassword) {
    // store fake token for demo purposes
    try {
      localStorage.setItem('auth_token', 'fake-jwt-token');
    } catch {}
    return mockUser;
  }

  throw new Error("Invalid email/phone or password");
}
