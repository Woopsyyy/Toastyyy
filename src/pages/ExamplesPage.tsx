import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  Globe,
  MessageSquare,
  Settings,
  Sparkles,
  Clock,
  Wind,
  Loader2,
  Download,
  Zap,
  Code,
  Layout as LayoutIcon,
} from "lucide-react";
import { useToasts } from "../hooks/useToasts";

type Category =
  | "All"
  | "Basics"
  | "Layouts"
  | "Advanced"
  | "Easing"
  | "Promises"
  | "Expanded";

export default function ExamplesPage() {
  const { addToast, updateToast } = useToasts();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardClick = (example: any) => {
    setActiveCardId(example.id);
    // Execute configured toast behavior only!
    example.action();
  };

  const handleConfigureClick = (e: React.MouseEvent, example: any) => {
    e.stopPropagation(); // Stop propagation so it doesn't fire the toast card click action
    // Navigate to playground and pass preset parameters
    navigate("/builder", { state: { preset: example.builderConfig } });
  };

  const examples = [
    {
      id: 1,
      title: "Default Toast",
      category: "Basics",
      desc: "Standard neutral alert profile ideal for generic telemetry updates.",
      tags: ["Default", "Basics"],
      likes: 120,
      icon: <Bell className="w-5 h-5 text-text-3" />,
      color: "bg-surface-2 border-border-strong text-text-2",
      builderConfig: {
        title: "System Dispatch Active",
        description: "Standard system operations are running normally.",
        showDescription: false,
        showAction: false,
        actionText: "Undo",
        customColor: "#ff8c3b",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "default" as const,
      },
      action: () =>
        addToast({
          type: "default",
          title: "System Dispatch Active",
        }),
    },
    {
      id: 2,
      title: "Success Toast",
      category: "Basics",
      desc: "Vibrant green confirmation layout triggered upon complete operations.",
      tags: ["Success", "Basics"],
      likes: 310,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      builderConfig: {
        title: "Golden Butter Toast Ready",
        description: "Baked to absolute crispy perfection.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#0bc47b",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "success" as const,
      },
      action: () =>
        addToast({
          type: "success",
          title: "Golden Butter Toast Ready",
          description: "Baked to absolute crispy perfection.",
          showDescription: true,
        }),
    },
    {
      id: 3,
      title: "Error Toast",
      category: "Basics",
      desc: "Critical red warning template capturing database or system failure logs.",
      tags: ["Error", "Basics"],
      likes: 242,
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      color: "bg-red-500/10 border-red-500/20 text-red-500",
      builderConfig: {
        title: "Burnt Toast Alert",
        description: "Heating element exceeded thermal bounds.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#f43f5e",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "error" as const,
      },
      action: () =>
        addToast({
          type: "error",
          title: "Burnt Toast Alert",
          description: "Heating element exceeded thermal bounds.",
          showDescription: true,
        }),
    },
    {
      id: 4,
      title: "Warning Toast",
      category: "Basics",
      desc: "Vibrant orange layout signaling high internal temperatures.",
      tags: ["Warning", "Basics"],
      likes: 184,
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      builderConfig: {
        title: "Oven Temperature Limit Reached",
        description: "Bake chambers require ventilation.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#f1a91d",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "warning" as const,
      },
      action: () =>
        addToast({
          type: "warning",
          title: "Oven Temperature Limit Reached",
          description: "Bake chambers require ventilation.",
          showDescription: true,
        }),
    },
    {
      id: 5,
      title: "Info Toast",
      category: "Basics",
      desc: "Informative blue styling card presenting chef suggestions.",
      tags: ["Info", "Basics"],
      likes: 195,
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-500",
      builderConfig: {
        title: "Chef Recommendation Active",
        description: "Sourdough is pre-heating in chamber-04.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#3b82f6",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "info" as const,
      },
      action: () =>
        addToast({
          type: "info",
          title: "Chef Recommendation Active",
          description: "Sourdough is pre-heating in chamber-04.",
          showDescription: true,
        }),
    },
    {
      id: 6,
      title: "With Description",
      category: "Layouts",
      desc: "A default notification enhanced with description layouts.",
      tags: ["Description", "Pill"],
      likes: 204,
      icon: <MessageSquare className="w-5 h-5 text-[#ff8c3b]" />,
      color: "bg-[#ff8c3b]/10 border-[#ff8c3b]/20 text-[#ff8c3b]",
      builderConfig: {
        title: "Gourmet Selection",
        description: "Freshly baked sourdough slice with cream cheese.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#ff8c3b",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "default" as const,
      },
      action: () =>
        addToast({
          type: "default",
          title: "Gourmet Selection",
          description: "Freshly baked sourdough slice with cream cheese.",
          showDescription: true,
        }),
    },
    {
      id: 7,
      title: "Warning + Description",
      category: "Layouts",
      desc: "Warning layout displaying telemetry descriptions.",
      tags: ["Warning", "Details"],
      likes: 154,
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      builderConfig: {
        title: "Internal Temperature Warning",
        description: "Thermostat exceeds 450 degrees in bake-chamber-02.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#f1a91d",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "warning" as const,
      },
      action: () =>
        addToast({
          type: "warning",
          title: "Internal Temperature Warning",
          description: "Thermostat exceeds 450 degrees in bake-chamber-02.",
          showDescription: true,
        }),
    },
    {
      id: 8,
      title: "Error + Description",
      category: "Layouts",
      desc: "Error layout displaying details for crash debugging.",
      tags: ["Error", "Telemetry"],
      likes: 298,
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      color: "bg-red-500/10 border-red-500/20 text-red-500",
      builderConfig: {
        title: "Baking Cycle Failed",
        description: "Connection lost with internal thermostat nodes.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#f43f5e",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "error" as const,
      },
      action: () =>
        addToast({
          type: "error",
          title: "Baking Cycle Failed",
          description: "Connection lost with internal thermostat nodes.",
          showDescription: true,
        }),
    },
    {
      id: 9,
      title: "With Action Button",
      category: "Layouts",
      desc: "Standard neutral alert with an action button preset.",
      tags: ["Action", "Interactive"],
      likes: 312,
      icon: <Settings className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-500",
      builderConfig: {
        title: "Telemetry Node Synced",
        description: "System configurations have synced globally.",
        showDescription: true,
        showAction: true,
        actionText: "View Logs",
        customColor: "#3b82f6",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "default" as const,
      },
      action: () =>
        addToast({
          type: "default",
          title: "Telemetry Node Synced",
          showAction: true,
          actionText: "View Logs",
        }),
    },
    {
      id: 10,
      title: "Error + Action",
      category: "Layouts",
      desc: "Red alert including retry actions.",
      tags: ["Error", "Retry"],
      likes: 211,
      icon: <Zap className="w-5 h-5 text-red-500" />,
      color: "bg-red-500/10 border-red-500/20 text-red-500",
      builderConfig: {
        title: "Connection Timed Out",
        description: "Retry compiling active modules.",
        showDescription: true,
        showAction: true,
        actionText: "Retry Compile",
        customColor: "#f43f5e",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "error" as const,
      },
      action: () =>
        addToast({
          type: "error",
          title: "Connection Timed Out",
          description: "Retry compiling active modules.",
          showDescription: true,
          showAction: true,
          actionText: "Retry Compile",
        }),
    },
    {
      id: 11,
      title: "Action + Success Pill",
      category: "Layouts",
      desc: "Success pill mapping low bounce spring layouts.",
      tags: ["Pill", "Elastic"],
      likes: 342,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      builderConfig: {
        title: "Sourdough Sliced Successfully",
        description: "Slice is warm and toasted.",
        showDescription: false,
        showAction: true,
        actionText: "Spread Butter",
        customColor: "#0bc47b",
        hasBorder: true,
        bounce: 0.15,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "success" as const,
      },
      action: () =>
        addToast({
          type: "success",
          title: "Sourdough Sliced Successfully",
          showAction: true,
          actionText: "Spread Butter",
          bounce: 0.15,
        }),
    },
    {
      id: 12,
      title: "Custom Component Body",
      category: "Advanced",
      desc: "Renders custom HTML layouts inside the toast card.",
      tags: ["Dynamic", "ReactNode"],
      likes: 412,
      icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
      color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-500",
      builderConfig: {
        title: "Upgrade Plan Success",
        description:
          "Upgraded to Gourmet Tier. Direct receipt sent to billing.",
        showDescription: true,
        showAction: true,
        actionText: "View Invoice",
        customColor: "#e06c1f",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "default" as const,
      },
      action: () =>
        addToast({
          type: "default",
          title: "Upgrade Plan Success",
          showDescription: true,
          description:
            "Upgraded to Gourmet Tier. Direct receipt sent to billing.",
          customColor: "#e06c1f",
        }),
    },
    {
      id: 13,
      title: "ReactNode Description",
      category: "Advanced",
      desc: "Description body rendered as complex inline text strings.",
      tags: ["ReactNode", "Render"],
      likes: 289,
      icon: <Clock className="w-5 h-5 text-[#ff8c3b]" />,
      color: "bg-[#ff8c3b]/10 border-[#ff8c3b]/20 text-[#ff8c3b]",
      builderConfig: {
        title: "Server Active",
        description: "Cluster-04 is running at 98% efficiency.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#ff8c3b",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "info" as const,
      },
      action: () =>
        addToast({
          type: "info",
          title: "Server Active",
          showDescription: true,
          description: "Cluster-04 is running at 98% efficiency.",
        }),
    },
    {
      id: 14,
      title: "No Spring (Smooth)",
      category: "Easing",
      desc: "Fires slides smoothly with zero bounce coefficients.",
      tags: ["Easing", "Linear"],
      likes: 198,
      icon: <Wind className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-500",
      builderConfig: {
        title: "Smooth Slide Active",
        description: "Fired with no spring physics.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#3b82f6",
        hasBorder: true,
        bounce: 0.0,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "default" as const,
      },
      action: () =>
        addToast({
          type: "default",
          title: "Smooth Slide Active",
          description: "Fired with no spring physics.",
          showDescription: true,
          bounce: 0.0,
        }),
    },
    {
      id: 15,
      title: "Success (no spring)",
      category: "Easing",
      desc: "Success layout transitions smoothly with zero bounce.",
      tags: ["Success", "No-Spring"],
      likes: 150,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      builderConfig: {
        title: "Files Saved in Workspace",
        description: "Synchronized with origin/main branch.",
        showDescription: false,
        showAction: false,
        actionText: "Undo",
        customColor: "#0bc47b",
        hasBorder: true,
        bounce: 0.0,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "success" as const,
      },
      action: () =>
        addToast({
          type: "success",
          title: "Files Saved in Workspace",
          bounce: 0.0,
        }),
    },
    {
      id: 16,
      title: "Error + Desc (no spring)",
      category: "Easing",
      desc: "Error warnings displaying logs using linear transitions.",
      tags: ["Error", "Easing"],
      likes: 132,
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      color: "bg-red-500/10 border-red-500/20 text-red-500",
      builderConfig: {
        title: "Hardware Failure Registered",
        description: "Critical crash handled with no spring.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#f43f5e",
        hasBorder: true,
        bounce: 0.0,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "error" as const,
      },
      action: () =>
        addToast({
          type: "error",
          title: "Hardware Failure Registered",
          description: "Critical crash handled with no spring.",
          showDescription: true,
          bounce: 0.0,
        }),
    },
    {
      id: 17,
      title: "Action (no spring)",
      category: "Easing",
      desc: "Action layout using linear smooth sliding transitions.",
      tags: ["Action", "Linear"],
      likes: 121,
      icon: <Zap className="w-5 h-5 text-text-3" />,
      color: "bg-surface-2 border-border-strong text-text-2",
      builderConfig: {
        title: "Database Overcapacity",
        description: "Fired with no spring.",
        showDescription: true,
        showAction: true,
        actionText: "Rollback",
        customColor: "#888888",
        hasBorder: true,
        bounce: 0.0,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "warning" as const,
      },
      action: () =>
        addToast({
          type: "warning",
          title: "Database Overcapacity",
          description: "Fired with no spring.",
          showDescription: true,
          showAction: true,
          actionText: "Rollback",
          bounce: 0.0,
        }),
    },
    {
      id: 18,
      title: "Promise (Morph Animation)",
      category: "Promises",
      desc: "Programmatic loader updating loading to success in 2 seconds.",
      tags: ["Loader", "Morph"],
      likes: 541,
      icon: <Loader2 className="w-5 h-5 text-accent animate-spin" />,
      color: "bg-accent/10 border-accent/20 text-accent",
      builderConfig: {
        title: "Fetching gourmet assets...",
        description: "Contacting server databases...",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#ff8c3b",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "loading" as const,
      },
      action: () => {
        const id = addToast({
          type: "loading",
          title: "Fetching gourmet assets...",
          showProgress: true,
          duration: 8000,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "success",
            title: "Assets Fetched Successfully",
            description: "Loaded 4 files in 240ms.",
            showDescription: true,
          });
        }, 2000);
      },
    },
    {
      id: 19,
      title: "Promise + Success (pill)",
      category: "Promises",
      desc: "Resolves loading into compact success pills in 2 seconds.",
      tags: ["Pill", "Update"],
      likes: 312,
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      builderConfig: {
        title: "Bundling modules...",
        description: "Tuning bundler options...",
        showDescription: false,
        showAction: false,
        actionText: "Undo",
        customColor: "#0bc47b",
        hasBorder: true,
        bounce: 0.15,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "loading" as const,
      },
      action: () => {
        const id = addToast({
          type: "loading",
          title: "Bundling modules...",
          duration: 8000,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "success",
            title: "Code Bundled!",
            bounce: 0.15,
          });
        }, 2000);
      },
    },
    {
      id: 20,
      title: "Promise + Error (pill)",
      category: "Promises",
      desc: "Resolves loading into compact error alerts in 2 seconds.",
      tags: ["Pill", "Error"],
      likes: 219,
      icon: <Sparkles className="w-5 h-5 text-red-500" />,
      color: "bg-red-500/10 border-red-500/20 text-red-500",
      builderConfig: {
        title: "Deploying tunnel...",
        description: "Setting up secure links...",
        showDescription: false,
        showAction: false,
        actionText: "Undo",
        customColor: "#f43f5e",
        hasBorder: true,
        bounce: 0.15,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "loading" as const,
      },
      action: () => {
        const id = addToast({
          type: "loading",
          title: "Deploying tunnel...",
          duration: 8000,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "error",
            title: "Deployment Failed!",
            bounce: 0.15,
          });
        }, 2000);
      },
    },
    {
      id: 21,
      title: "Promise + Error (expanded)",
      category: "Promises",
      desc: "Resolves loading into detailed error descriptions.",
      tags: ["Error", "Expanded"],
      likes: 209,
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      color: "bg-red-500/10 border-red-500/20 text-red-500",
      builderConfig: {
        title: "Resolving DNS records...",
        description: "Contacting server...",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#f43f5e",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "loading" as const,
        variant: "expanded" as const,
      },
      action: () => {
        const id = addToast({
          type: "loading",
          title: "Resolving DNS records...",
          description: "Contacting server...",
          showDescription: true,
          variant: "expanded",
          duration: 8000,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "error",
            title: "DNS Resolution Failed",
            description: "Network timeout connecting to public registry.",
            showDescription: true,
            variant: "expanded",
          });
        }, 2500);
      },
    },
    {
      id: 22,
      title: "Promise + Success (expanded)",
      category: "Promises",
      desc: "Resolves loading into detailed success descriptions.",
      tags: ["Success", "Expanded"],
      likes: 422,
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      builderConfig: {
        title: "Syncing user workspace...",
        description: "Uploading details...",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#0bc47b",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "loading" as const,
        variant: "expanded" as const,
      },
      action: () => {
        const id = addToast({
          type: "loading",
          title: "Syncing user workspace...",
          description: "Uploading details...",
          showDescription: true,
          variant: "expanded",
          duration: 8000,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "success",
            title: "Workspace Fully Synced",
            description: "All 12 modified files updated successfully.",
            showDescription: true,
            variant: "expanded",
          });
        }, 2500);
      },
    },
    {
      id: 23,
      title: "Update Toast Content",
      category: "Promises",
      desc: "Fires an informative alert, and updates its text contents.",
      tags: ["Update", "Content"],
      likes: 278,
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-500",
      builderConfig: {
        title: "Verifying user credentials...",
        description: "Connecting to database auth servers...",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#3b82f6",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "info" as const,
      },
      action: () => {
        const id = addToast({
          type: "info",
          title: "Verifying user credentials...",
          description: "Connecting to database auth servers...",
          showDescription: true,
          duration: 8000,
        });
        setTimeout(() => {
          updateToast(id, {
            type: "success",
            title: "Credentials Verified",
            description: "Access granted. Welcome back, Chef!",
            showDescription: true,
          });
        }, 2000);
      },
    },
    {
      id: 24,
      title: "Linear Progress Bar",
      category: "Advanced",
      desc: "Fires a success confirmation card with progress bars active.",
      tags: ["Progress", "Timer"],
      likes: 311,
      icon: <Zap className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      builderConfig: {
        title: "Automatic Backup Complete",
        description: "Review updates in settings.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#0bc47b",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "success" as const,
      },
      action: () =>
        addToast({
          type: "success",
          title: "Automatic Backup Complete",
          description: "Review updates in settings.",
          showDescription: true,
          showProgress: true,
        }),
    },
    {
      id: 25,
      title: "Gourmet Callbacks",
      category: "Advanced",
      desc: "Fires callbacks popping custom alert confirmation dialogs.",
      tags: ["Callbacks", "Events"],
      likes: 189,
      icon: <Download className="w-5 h-5 text-[#ff8c3b]" />,
      color: "bg-[#ff8c3b]/10 border-[#ff8c3b]/20 text-[#ff8c3b]",
      builderConfig: {
        title: "Action Triggered Callback",
        description: "Click below to dispatch target events.",
        showDescription: true,
        showAction: true,
        actionText: "Execute Callback",
        customColor: "#ff8c3b",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: false,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "default" as const,
        variant: "standard" as const,
      },
      action: () =>
        addToast({
          type: "default",
          title: "Action Triggered Callback",
          description: "Click below to dispatch target events.",
          showDescription: true,
          showAction: true,
          actionText: "Execute Callback",
          customColor: "#ff8c3b",
          variant: "standard",
        }),
    },
    {
      id: 26,
      title: "Storage Warning (Expanded)",
      category: "Expanded",
      desc: "Morphed double-bubble gooey warning toast replicating premium system alerts.",
      tags: ["Morphic", "Expanded", "Warning"],
      likes: 620,
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      builderConfig: {
        title: "Storage warning",
        description: "You are using 95% of your available storage.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#f1a91d",
        hasBorder: true,
        bounce: 0.5,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: true,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "warning" as const,
        variant: "expanded" as const,
      },
      action: () =>
        addToast({
          type: "warning",
          title: "Storage warning",
          description: "You are using 95% of your available storage.",
          showDescription: true,
          showTimestamp: true,
          variant: "expanded",
        }),
    },
    {
      id: 27,
      title: "Build Success (Expanded)",
      category: "Expanded",
      desc: "Expanded success notification displaying dynamic deploy status with rich contrast rendering.",
      tags: ["Success", "Expanded", "Deploy"],
      likes: 712,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
      builderConfig: {
        title: "Production Build Succeeded",
        description:
          "All bundle assets have been successfully optimized and compiled to static CDN locations.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#10b981",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: true,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "success" as const,
        variant: "expanded" as const,
      },
      action: () =>
        addToast({
          type: "success",
          title: "Production Build Succeeded",
          description:
            "All bundle assets have been successfully optimized and compiled to static CDN locations.",
          showDescription: true,
          showTimestamp: true,
          variant: "expanded",
        }),
    },
    {
      id: 28,
      title: "Connection Failure (Expanded)",
      category: "Expanded",
      desc: "High contrast expanded error notification featuring rapid error status and visual red cues.",
      tags: ["Error", "Expanded", "System"],
      likes: 549,
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
      color: "bg-rose-500/10 border-rose-500/20 text-rose-500",
      builderConfig: {
        title: "Database Sync Offline",
        description:
          "Failed to establish a secure handshake with the primary cloud replica. Offline changes are stored locally.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#ef4444",
        hasBorder: true,
        bounce: 0.5,
        theme: "dark" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: true,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "error" as const,
        variant: "expanded" as const,
      },
      action: () =>
        addToast({
          type: "error",
          title: "Database Sync Offline",
          description:
            "Failed to establish a secure handshake with the primary cloud replica. Offline changes are stored locally.",
          showDescription: true,
          showTimestamp: true,
          variant: "expanded",
        }),
    },
    {
      id: 29,
      title: "System Update (Expanded)",
      category: "Expanded",
      desc: "Mated blue micro-timing notification informing user of system background actions.",
      tags: ["Info", "Expanded", "Scheduler"],
      likes: 428,
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-500",
      builderConfig: {
        title: "Index Optimization Running",
        description:
          "System database indexes are being rebuilt and compacted in the background. Performance might fluctuate.",
        showDescription: true,
        showAction: false,
        actionText: "Undo",
        customColor: "#3b82f6",
        hasBorder: true,
        bounce: 0.4,
        theme: "light" as const,
        showProgress: true,
        closeOnEscape: false,
        showTimestamp: true,
        showCloseButton: true,
        position: "bottom-right" as const,
        type: "info" as const,
        variant: "expanded" as const,
      },
      action: () =>
        addToast({
          type: "info",
          title: "Index Optimization Running",
          description:
            "System database indexes are being rebuilt and compacted in the background. Performance might fluctuate.",
          showDescription: true,
          showTimestamp: true,
          variant: "expanded",
        }),
    },
  ];

  const filteredExamples =
    activeCategory === "All"
      ? examples
      : examples.filter((item) => item.category === activeCategory);

  return (
    <div className="container-wide py-24 px-6 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 select-none">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
              <LayoutIcon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-accent-2 uppercase tracking-widest">
              Showcase Recipes
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-extrabold tracking-tight text-text mb-4"
          >
            Interactive{" "}
            <span className="gradient-text-warm font-black">Examples</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-2 text-sm md:text-base leading-relaxed"
          >
            Click any card to fire that toast semantic behavior instantly, or
            click **Configure** to load the preset parameters directly into the
            Playground Sandbox!
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center bg-white rounded-2xl border border-border-strong p-1.5 shadow-sm select-none gap-3"
        >
          <div className="flex flex-wrap gap-1">
            {(
              [
                "All",
                "Basics",
                "Layouts",
                "Advanced",
                "Easing",
                "Promises",
                "Expanded",
              ] as Category[]
            ).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all relative ${activeCategory === cat ? "bg-accent text-white shadow-sm" : "text-text-3 hover:text-text-2"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="h-5 w-[1px] bg-border-strong hidden sm:block" />
          <button
            onClick={() => navigate("/builder")}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase bg-accent-gradient text-white hover:scale-[1.03] transition-all shadow-md active:scale-95"
          >
            <Code className="w-3.5 h-3.5" />
            Go to Playground
          </button>
        </motion.div>
      </div>

      {/* Grid List (Full Width - 4 Cards Per Row) */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredExamples.map((example, i) => {
              const isActive = activeCardId === example.id;
              return (
                <motion.div
                  key={example.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{
                    opacity: 1,
                    scale: isActive ? 1.02 : 1,
                    y: 0,
                    borderColor: isActive ? "#ff8c3b" : "rgba(255,140,59,0.1)",
                  }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.4, delay: i * 0.01 }}
                  whileHover={{ y: -3 }}
                  onClick={() => handleCardClick(example)}
                  className={`glass rounded-[24px] border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${isActive ? "ring-2 ring-accent/20 shadow-[0_0_15px_rgba(255,140,59,0.15)] bg-white" : ""}`}
                >
                  <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-extrabold text-accent-2 bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                        {example.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${example.color} border shadow-inner`}
                      >
                        {example.icon}
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold text-text leading-tight">
                          {example.title}
                        </h3>
                        <p className="text-[9px] font-bold text-text-3 uppercase tracking-wider mt-0.5 select-none">
                          Preset #{example.id}00
                        </p>
                      </div>
                    </div>

                    <p className="text-text-2 text-[11px] leading-relaxed">
                      {example.desc}
                    </p>
                  </div>

                  <div className="px-5 py-3 border-t border-border-strong flex items-center justify-between bg-white/40">
                    <div className="flex flex-wrap gap-1">
                      {example.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-white border border-border-strong text-[8px] font-extrabold text-text-2 tracking-wider uppercase select-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => handleConfigureClick(e, example)}
                      className="text-[9px] font-black uppercase text-accent-2 hover:text-accent flex items-center gap-1 hover:gap-1.5 transition-all select-none p-1 rounded-lg hover:bg-accent/10"
                    >
                      Configure
                      <Code className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
