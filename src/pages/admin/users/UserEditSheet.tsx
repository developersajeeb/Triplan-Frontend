import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProfilePhotoUploader from '@/components/shared/uploaders/ProfilePhotoUploader';
import type { IAdminUserRecord } from '@/redux/features/user/user.api';

type Props = {
  user: IAdminUserRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: FormData) => Promise<void> | void;
  isSubmitting?: boolean;
};

type EditFormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  post_code: string;
  role: IAdminUserRecord['role'];
  isActive: NonNullable<IAdminUserRecord['isActive']>;
  isVerified: boolean;
};

const defaultState: EditFormState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  country: '',
  city: '',
  post_code: '',
  role: 'USER',
  isActive: 'ACTIVE',
  isVerified: false,
};

const UserEditSheet = ({ user, open, onOpenChange, onSubmit, isSubmitting = false }: Props) => {
  const [form, setForm] = useState<EditFormState>(defaultState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      setForm(defaultState);
      setImageFile(null);
      return;
    }

    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      country: user.country || '',
      city: user.city || '',
      post_code: user.post_code || '',
      role: user.role,
      isActive: user.isActive || 'ACTIVE',
      isVerified: Boolean(user.isVerified),
    });
    setImageFile(null);
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Name and email are required.');
      return;
    }

    const payloadData = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      address: form.address.trim() || undefined,
      country: form.country.trim() || undefined,
      city: form.city.trim() || undefined,
      post_code: form.post_code.trim() || undefined,
      role: form.role,
      isActive: form.isActive,
      isVerified: form.isVerified,
    };

    const payload = new FormData();
    payload.append('data', JSON.stringify(payloadData));

    if (imageFile) {
      payload.append('picture', imageFile);
    }

    await onSubmit(payload);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>Edit user information</SheetDescription>
        </SheetHeader>

        {user ? (
          <form onSubmit={handleSubmit} className="flex min-h-full flex-col bg-white">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-xl font-bold text-slate-900">Edit {user.name || 'User'}</h2>
              <p className="text-sm text-slate-500 mt-1">Update contact, profile, role, and status details.</p>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Profile Image</Label>
                  <ProfilePhotoUploader onChange={setImageFile} defaultPreview={user.picture} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-name">Name</Label>
                  <Input id="user-name" className="tp-input" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input id="user-email" type="email" className="tp-input" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-phone">Phone</Label>
                  <Input id="user-phone" className="tp-input" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-country">Country</Label>
                  <Input id="user-country" className="tp-input" value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-city">City</Label>
                  <Input id="user-city" className="tp-input" value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-postcode">Post Code</Label>
                  <Input id="user-postcode" className="tp-input" value={form.post_code} onChange={(event) => setForm((current) => ({ ...current, post_code: event.target.value }))} />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="user-address">Address</Label>
                  <Textarea id="user-address" className="tp-input" value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} rows={4} />
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={form.role} onValueChange={(value) => setForm((current) => ({ ...current, role: value as IAdminUserRecord['role'] }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="GUIDE">Guide</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.isActive} onValueChange={(value) => setForm((current) => ({ ...current, isActive: value as NonNullable<IAdminUserRecord['isActive']> }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="BLOCKED">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:col-span-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Verified account</p>
                    <p className="text-sm text-slate-500">Mark this user as verified if identity is confirmed.</p>
                  </div>
                  <Switch checked={form.isVerified} onCheckedChange={(checked) => setForm((current) => ({ ...current, isVerified: checked }))} />
                </div>
              </div>
            </div>

            <div className="mt-auto border-t border-slate-100 bg-white px-6 py-4">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary-900 hover:bg-primary-700" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default UserEditSheet;