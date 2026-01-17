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
import { Textarea } from "@/components/ui/textarea";
import { useContacts } from "@/hooks/use-contacts";
import type { Contact } from "@/types/friendforce";
import { Mail, Send, Users } from "lucide-react";
import { toast } from "sonner";

const Blasts = () => {
  const [message, setMessage] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { data: contacts, isLoading } = useContacts();

  const contactsWithEmail = contacts?.filter((c: Contact) => c.email) || [];

  const handleSave = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    if (contactsWithEmail.length === 0) {
      toast.error("No contacts with email addresses");
      return;
    }
    setIsPreviewOpen(true);
  };

  const handleSend = () => {
    toast.success(`Blast ready to send to ${contactsWithEmail.length} contacts!`);
    setIsPreviewOpen(false);
    setMessage("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blasts</h1>
          <p className="text-muted-foreground mt-1">
            Send an email to all your contacts at once.
          </p>
        </div>

        {/* Stats */}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? "..." : contactsWithEmail.length}
              </p>
              <p className="text-sm text-muted-foreground">
                Contacts with email addresses
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Compose */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Compose Your Blast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write your message here... This will be sent to all your contacts."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Send className="w-4 h-4" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Blast Preview</DialogTitle>
              <DialogDescription>
                Review your message and recipients before sending.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 overflow-y-auto flex-1">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">
                  Your Message
                </h4>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="whitespace-pre-wrap text-foreground">{message}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">
                  Recipients ({contactsWithEmail.length} contacts)
                </h4>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border max-h-[200px] overflow-y-auto">
                  <ul className="space-y-1">
                    {contactsWithEmail.map((contact: Contact) => (
                      <li
                        key={contact.id}
                        className="text-sm text-foreground flex items-center gap-2"
                      >
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-muted-foreground">
                          ({contact.email})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Edit
              </Button>
              <Button onClick={handleSend} className="gap-2">
                <Send className="w-4 h-4" />
                Send Blast
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Blasts;
