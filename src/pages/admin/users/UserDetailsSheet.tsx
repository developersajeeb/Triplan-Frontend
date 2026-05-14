import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/config';
import type { IAdminUserRecord } from '@/redux/features/user/user.api';

type Props = {
  user: IAdminUserRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formatDate = (value?: string | null) => {
  if (!value) {
    return 'N/A';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const InfoItem = ({ label, value }: { label: string; value: string | number | boolean | null | undefined }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-medium text-slate-900 break-words">{String(value ?? 'N/A')}</p>
  </div>
);

const UserDetailsSheet = ({ user, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>Detailed user information</SheetDescription>
        </SheetHeader>

        {user ? (
          <div className="min-h-full bg-gradient-to-b from-slate-50 to-white">
            <div className="relative overflow-hidden bg-slate-900 px-6 pb-8 pt-10 text-white">
              <div className="absolute right-4 top-4 z-20">
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-full p-2 text-white hover:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </Button>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.22),_transparent_35%)]" />
              <div className="relative flex items-start gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-3xl border border-white/20 bg-white/10">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold uppercase">
                      {user.name?.slice(0, 2) || 'U'}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-bold">{user.name || 'N/A'}</h2>
                    <Badge className="bg-white/15 text-white hover:bg-white/20">{user.role}</Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/20">
                      {user.isActive || 'Unknown'}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-white/75 break-all">{user.email}</p>
                  <p className="text-sm text-white/60">Joined {formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Bookings</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{Number(user.toursBookedCount ?? user.bookingsCount ?? 0)}</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Spent</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{formatCurrency(Number(user.totalSpent ?? 0))}</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Verified</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{user.isVerified ? 'Yes' : 'No'}</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-none">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Updated</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{formatDate(user.updatedAt)}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem label="Email" value={user.email} />
                <InfoItem label="Phone" value={user.phone} />
                <InfoItem label="Country" value={user.country} />
                <InfoItem label="City" value={user.city} />
                <InfoItem label="Address" value={user.address} />
                <InfoItem label="Post Code" value={user.post_code} />
                <InfoItem label="Role" value={user.role} />
                <InfoItem label="Status" value={user.isActive} />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Profile Snapshot</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {user.name || 'This user'} is registered with {Number(user.toursBookedCount ?? user.bookingsCount ?? 0)} booked tour{Number(user.toursBookedCount ?? user.bookingsCount ?? 0) === 1 ? '' : 's'} and has spent {formatCurrency(Number(user.totalSpent ?? 0))} so far.
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default UserDetailsSheet;