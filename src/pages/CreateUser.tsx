"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, updateUser, getUserById } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles = ["SuperAdmin", "Admin", "User"];

export default function UserForm() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const user = await getUserById(userId);
          setValue("name", user.name);
          setValue("email", user.email);
          setValue("role", user.role || "User");
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [userId, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        password: data.password ? data.password : undefined,
      };

      if (userId) {
        await updateUser(userId, payload);
      } else {
        await createUser(payload);
      }

      navigate("/users");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">
        {userId ? "Edit User" : "Create User"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="Enter name"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter email"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            onValueChange={(value) => setValue("role", value)}
            defaultValue={watch("role") || "User"}
          >
            <SelectTrigger className="w-full">
              <Shield
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-300 backdrop-blur-sm border border-gray-300 shadow-md">
              {roles.map((role) => (
                <SelectItem
                  key={role}
                  value={role}
                  className="hover:bg-gray-200"
                >
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="password">
            {userId ? "New Password" : "Password"}
          </Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder={userId ? "Enter new password" : "Enter password"}
              className="pl-10"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          {userId ? "Update User" : "Create User"}
        </Button>
      </form>
    </Card>
  );
}
