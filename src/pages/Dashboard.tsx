import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const data = [
  { name: "Jan", value: 2000 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 2200 },
  { name: "Apr", value: 2800 },
  { name: "May", value: 4500 },
  { name: "Jun", value: 6000 },
  { name: "Jul", value: 5000 },
  { name: "Aug", value: 6200 },
  { name: "Sep", value: 4800 },
  { name: "Oct", value: 5300 },
  { name: "Nov", value: 4100 },
  { name: "Dec", value: 4600 },
];

const salesData = [
  {
    name: "Ram Thapa",
    email: "ram.thapa@email.com",
    amount: "$1,999.00",
  },
  { name: "Hari Karki", email: "karki.hari@email.com", amount: "$39.00" },
  {
    name: "Sanotosh Khadka",
    email: "Sanotosh@email.com",
    amount: "$299.00",
  },
  { name: "Roshan  khadka", email: "khadka@email.com", amount: "$99.00" },
  { name: "Milan Chaudhary", email: "Milan@email.com", amount: "$39.00" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6  text-black min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* <Button variant="outline">Download</Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white-300 p-6">
          <CardHeader>Total Revenue</CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$45,231.89</p>
            <p className="text-green-400">+20.1% from last month</p>po0po
          </CardContent>
        </Card>

        <Card className="bg-white-300 p-6">
          <CardHeader>Users</CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">+2,350</p>
            <p className="text-green-400">+180.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white-300 p-6">
          <CardHeader>Data</CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">+12,234</p>
            <p className="text-green-400">+19% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white-300 p-6">
          <CardHeader>Active Now</CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">+573</p>
            <p className="text-green-400">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white-300 p-6">
          <CardHeader>Overview</CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="black" />
                <YAxis stroke="black" />
                <Tooltip cursor={{ fill: "#333" }} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white-300 p-6">
          <CardHeader>User Payment</CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {salesData.map((sale, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/avatar-placeholder.png"
                        alt={sale.name}
                      />
                      <AvatarFallback>{sale.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">{sale.name}</p>
                      <p className="text-gray-400 text-sm">{sale.email}</p>
                    </div>
                  </div>
                  <p className="text-green-400 font-semibold">{sale.amount}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
