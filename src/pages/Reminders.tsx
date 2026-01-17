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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContacts } from "@/hooks/use-contacts";
import {
  useCompleteReminder,
  useCreateReminder,
  useDeleteReminder,
  useReminders,
} from "@/hooks/use-reminders";
import type { Contact, Reminder, ReminderFormData, ReminderFrequency } from "@/types/friendforce";
import {
  Bell,
  Calendar,
  Check,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const frequencyLabels: Record<ReminderFrequency, string> = {
  none: "One-time",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  yearly: "Yearly",
};

const Reminders = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ReminderFormData>({
    contact: "",
    title: "",
    due_date: "",
    frequency: "none",
  });

  const { data: reminders, isLoading } = useReminders();
  const { data: contacts } = useContacts();
  const createReminder = useCreateReminder();
  const deleteReminder = useDeleteReminder();
  const completeReminder = useCompleteReminder();

  const pendingReminders =
    reminders?.filter((r: Reminder) => !r.completed) || [];
  const completedReminders =
    reminders?.filter((r: Reminder) => r.completed) || [];

  const handleAddReminder = async () => {
    if (!formData.contact || !formData.title || !formData.due_date) {
      toast.error("Please fill in all required fields");
      return;
    }

    await createReminder.mutateAsync(formData);
    setIsAddDialogOpen(false);
    setFormData({
      contact: "",
      title: "",
      due_date: "",
      frequency: "none",
    });
    toast.success("Reminder created successfully");
  };

  const handleDeleteReminder = async (id: string) => {
    await deleteReminder.mutateAsync(id);
    toast.success("Reminder deleted");
  };

  const handleCompleteReminder = async (id: string) => {
    await completeReminder.mutateAsync(id);
    toast.success("Reminder marked as complete");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateStr);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUntilLabel = (days: number) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `in ${days} days`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reminders</h1>
            <p className="text-muted-foreground mt-1">
              Stay on top of your relationship commitments.
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Reminder</DialogTitle>
                <DialogDescription>
                  Create a reminder for a contact.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact *</Label>
                  <Select
                    value={formData.contact}
                    onValueChange={(value) =>
                      setFormData({ ...formData, contact: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a contact" />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts?.map((contact: Contact) => (
                        <SelectItem key={contact.id} value={contact.id}>
                          {contact.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Birthday, Catch up, Coffee"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date *</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) =>
                      setFormData({ ...formData, due_date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value: ReminderFrequency) =>
                      setFormData({ ...formData, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">One-time</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddReminder}
                  disabled={createReminder.isPending}
                >
                  {createReminder.isPending ? "Creating..." : "Create Reminder"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {pendingReminders.length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {completedReminders.length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reminders */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Pending Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {isLoading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : pendingReminders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No pending reminders. Add one to get started!
                </p>
              ) : (
                pendingReminders.map((reminder: Reminder) => {
                  const daysUntil = getDaysUntil(reminder.due_date);
                  const isOverdue = daysUntil < 0;

                  return (
                    <div
                      key={reminder.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        isOverdue
                          ? "bg-red-50 border-red-200"
                          : "bg-secondary/30 border-border/50 hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-medium text-sm">
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
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(reminder.due_date).toLocaleDateString()}
                          </p>
                          <p
                            className={`text-xs ${isOverdue ? "text-red-600 font-medium" : "text-muted-foreground"}`}
                          >
                            {getDaysUntilLabel(daysUntil)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {frequencyLabels[reminder.frequency]}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleCompleteReminder(reminder.id)}
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteReminder(reminder.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Completed Reminders */}
        {completedReminders.length > 0 && (
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedReminders.map((reminder: Reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/30 opacity-60"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground line-through">
                          {reminder.contact_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {reminder.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {new Date(reminder.due_date).toLocaleDateString()}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteReminder(reminder.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reminders;
