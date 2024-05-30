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
      <DialogTrigger className="hidden rounded-lg border border-white/20 bg-slate-700/25 px-3 py-1.5 text-sm text-slate-200 md:block">
        Search Games...
      </DialogTrigger>
      <DialogContent className="bg-slate-700">
        <DialogHeader>
          <DialogTitle className="pb-2 text-base text-slate-200">
            Search for games:
          </DialogTitle>
          <div className="flex justify-between rounded-lg border border-white/20 bg-slate-700/25">
            <input
              type="text"
              placeholder="Search"
              className=" w-full bg-slate-700/25 px-3 py-1.5 text-sm text-slate-200"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-yellow-400 px-3 text-blue-700"
            >
              GO
            </button>
            {/* TODO: Replace GO with an icon */}
          </div>
          <DialogDescription className="pt-2 text-xs text-slate-400">
            Powered by RAWG API
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
