"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function DatePInput() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="md:w-64 w-full justify-start text-left font-normal"
          >
            {date ? format(date, "dd.MM.yyyy") : "Выберите дату"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <input type="hidden" name="date" value={date ? date.toISOString() : ""} />
    </div>
  );
}
