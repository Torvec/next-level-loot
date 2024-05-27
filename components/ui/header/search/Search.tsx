// TODO: Add shadcn/ui dialog component, this is just temporary
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Search() {
  return (
    <Dialog>
      <DialogTrigger className="rounded-lg border border-white/20 bg-slate-700/25 px-3 py-1.5 text-sm text-slate-200">
        Search Games...
      </DialogTrigger>
      <DialogContent className="bg-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-200">
            Search for games:
          </DialogTitle>
          <input
            type="text"
            placeholder="Search"
            className="rounded-lg border border-white/20 bg-slate-700/25 px-3 py-1.5 text-sm text-slate-200"
          />
          <DialogDescription>Something goes here</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
