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
import { Label } from "../ui/label";

export function DatePInput() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Label
        htmlFor="date"
        className="block w-full text-center text-md  mb-6 cursor-pointer h-6"
      >
        {date ? "" : "выберите дату"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-120 justify-center items-center tracking-wider font-bold h-14 bg-border"
          >
            {date ? format(date, "dd.MM.yyyy") : ""}
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
