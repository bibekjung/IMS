"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { getAllUser, deleteUser } from "@/api/user";
import { useNavigate } from "react-router-dom";

type User = {
  role: any;
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterName, setFilterName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        setError("Failed to load user data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFilteredUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setFilterName(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">User Details</h1>
        <div className="mt-6 flex justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-t-4 border-gray-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Details</h2>
        <Button
          className="flex items-center gap-2"
          onClick={() => navigate("/users/create")}
        >
          <Plus className="w-5 h-5" /> Add User
        </Button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Filter by Name"
          value={filterName}
          onChange={handleFilter}
        />
      </div>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-lg border shadow-sm">
        <Table className="w-full">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-6 py-3 text-left">
                <button
                  className="text-left w-full"
                  onClick={handleSort}
                  aria-label={`Sort by Name ${
                    sortOrder === "asc" ? "Descending" : "Ascending"
                  }`}
                >
                  Name
                </button>
              </TableHead>
              <TableHead className="px-6 py-3 text-left">Email</TableHead>
              <TableHead className="px-6 py-3 text-left">Role</TableHead>
              <TableHead className="px-6 py-3 text-left">Created At</TableHead>
              <TableHead className="px-6 py-3 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b">
                  <TableCell className="px-6 py-4">{user.name}</TableCell>
                  <TableCell className="px-6 py-4">{user.email}</TableCell>
                  <TableCell className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-transparent"
                        >
                          {user.role}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="bg-transparent border-none shadow-none"
                      >
                        <DropdownMenuItem className="hover:bg-gray-200 cursor-pointer">
                          {user.role}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white shadow-lg border rounded-md p-2"
                      >
                        <DropdownMenuItem
                          onClick={() => navigate(`/users/edit/${user.id}`)}
                          className="cursor-pointer hover:bg-gray-200"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 cursor-pointer hover:bg-gray-200"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-gray-500"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
