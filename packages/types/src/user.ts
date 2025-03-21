interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  numberOfRents: number;
  totalAverageWeightRatings: number;
  recentlyActive: Date;
}
export type { User };
