import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser, useSaveProfile } from "@/hooks/useCurrentUser";
import { Save, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AccountPage() {
  const { profile, isLoading } = useCurrentUser();
  const saveProfile = useSaveProfile();
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? "",
        email: profile.email ?? "",
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await saveProfile.mutateAsync({
        ...profile,
        name: form.name,
        email: form.email,
      });
      toast.success("Profile saved successfully");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="space-y-6" data-ocid="account.page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your profile and preferences
        </p>
      </div>

      <Card data-ocid="account.profile_card">
        <CardHeader className="flex flex-row items-center gap-3">
          <UserCircle size={20} className="text-primary" />
          <CardTitle className="text-base">Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Smith"
                  data-ocid="account.name_input"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@company.com"
                  data-ocid="account.email_input"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={saveProfile.isPending}
                data-ocid="account.save_button"
              >
                <Save size={14} className="mr-1.5" />
                {saveProfile.isPending ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
