import { useState } from "react";
import DashboardLayout from "@/components/layouts/ExampleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDashboardStats,
  useRecentContacts,
  useStaleContacts,
} from "@/hooks/use-dashboard";
import { useContacts, useLogInteraction } from "@/hooks/use-contacts";
import { useUpcomingReminders } from "@/hooks/use-reminders";
import type { Contact, Reminder } from "@/types/friendforce";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Calendar,
  Clock,
  Gift,
  MessageSquare,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const typeColors: Record<string, string> = {
  friend: "bg-primary/10 text-primary",
  professional: "bg-accent/10 text-accent",
  mentor: "bg-secondary text-secondary-foreground",
};

const Dashboard = () => {
  const [isLogMeetupOpen, setIsLogMeetupOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string>("");

  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: upcomingReminders } = useUpcomingReminders();
  const { data: staleContacts } = useStaleContacts();
  const { data: recentContacts } = useRecentContacts();
  const { data: allContacts } = useContacts();
  const logInteraction = useLogInteraction();

  const handleLogMeetup = async () => {
    if (!selectedContactId) {
      toast.error("Please select a contact");
      return;
    }
    await logInteraction.mutateAsync(selectedContactId);
    toast.success("Meetup logged successfully!");
    setIsLogMeetupOpen(false);
    setSelectedContactId("");
  };

  const statItems = [
    {
      label: "Total Contacts",
      value: stats?.total_contacts ?? 0,
      icon: Users,
      color: "primary",
    },
    {
      label: "Upcoming Reminders",
      value: stats?.upcoming_reminders ?? 0,
      icon: Bell,
      color: "accent",
    },
    {
      label: "Recent Interactions",
      value: stats?.recent_interactions_count ?? 0,
      icon: Gift,
      color: "primary",
    },
    {
      label: "Needs Attention",
      value: stats?.needs_attention ?? 0,
      icon: Calendar,
      color: "accent",
    },
  ];

  const formatLastContact = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your connections.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsLogMeetupOpen(true)}
            >
              <MessageSquare className="w-4 h-4" />
              Log Meetup
            </Button>
            <Dialog open={isLogMeetupOpen} onOpenChange={setIsLogMeetupOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Log Meetup</DialogTitle>
                  <DialogDescription>
                    Record an interaction with a contact.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Select
                      value={selectedContactId}
                      onValueChange={setSelectedContactId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a contact" />
                      </SelectTrigger>
                      <SelectContent>
                        {allContacts?.map((contact: Contact) => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsLogMeetupOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogMeetup}
                    disabled={logInteraction.isPending}
                  >
                    {logInteraction.isPending ? "Logging..." : "Log Meetup"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Link to="/dashboard/contacts">
              <Button className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add Contact
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((stat) => (
            <Card
              key={stat.label}
              className="border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {statsLoading ? "..." : stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      stat.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Reminders */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Upcoming Reminders
              </CardTitle>
              <Link to="/dashboard/reminders">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!upcomingReminders?.length ? (
                  <p className="text-muted-foreground text-sm">
                    No upcoming reminders
                  </p>
                ) : (
                  upcomingReminders.map((reminder: Reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {getInitials(reminder.contact_name)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {reminder.contact_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {reminder.title}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {new Date(reminder.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Needs Attention */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Needs Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                People you haven't connected with in a while:
              </p>
              <div className="space-y-3">
                {!staleContacts?.length ? (
                  <p className="text-muted-foreground text-sm">
                    All relationships are up to date!
                  </p>
                ) : (
                  staleContacts.map((contact: Contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-accent/30 bg-accent/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <span className="text-accent text-xs font-medium">
                            {getInitials(contact.name)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {contact.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatLastContact(contact.last_contact)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-accent hover:text-accent"
                        onClick={() => logInteraction.mutate(contact.id)}
                      >
                        Reach out
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Contacts */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Recent Contacts
            </CardTitle>
            <Link to="/dashboard/contacts">
              <Button variant="ghost" size="sm">
                View All Contacts
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {!recentContacts?.length ? (
                <p className="text-muted-foreground text-sm">No contacts yet</p>
              ) : (
                recentContacts.map((contact: Contact) => (
                  <div
                    key={contact.id}
                    className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {getInitials(contact.name)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {contact.name}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            typeColors[contact.contact_type] || typeColors.friend
                          }`}
                        >
                          {contact.contact_type}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last contact: {formatLastContact(contact.last_contact)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
