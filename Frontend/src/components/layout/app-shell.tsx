import { AddMentorButton } from "@/components/features/conversations/add-mentor-button";
import { MentorWorkspace } from "@/components/features/conversations/mentor-workspace";
import { MicButton } from "@/components/features/conversations/mic-button";
import { AuroraBackground } from "@/components/layout/aurora-background";
import { Header } from "@/components/layout/header";
import { NotesPanel } from "@/components/layout/notes-panel";
import { Sidebar } from "@/components/layout/sidebar";

export function AppShell() {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background">
      <AuroraBackground />

      <Header />

      <div className="relative z-10 flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="relative flex flex-1 flex-col overflow-hidden">
          <MentorWorkspace />

          <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-center">
            <div className="pointer-events-auto flex items-end gap-3">
              <MicButton />
              <AddMentorButton />
            </div>
          </div>
        </main>

        <NotesPanel />
      </div>
    </div>
  );
}