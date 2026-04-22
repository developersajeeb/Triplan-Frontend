import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Watch } from "lucide-react";

const TIME_HOURS = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);
const TIME_MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

type TimePeriod = "AM" | "PM";

const parseTimeParts = (value?: string) => {
  const fallback = { hour: "12", minute: "00", period: "AM" as TimePeriod };

  if (!value) return fallback;

  const twelveHourMatch = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (twelveHourMatch) {
    const [, hourRaw, minuteRaw, periodRaw] = twelveHourMatch;
    const hour = String(Number(hourRaw)).padStart(2, "0");
    return {
      hour: TIME_HOURS.includes(hour) ? hour : fallback.hour,
      minute: TIME_MINUTES.includes(minuteRaw) ? minuteRaw : fallback.minute,
      period: periodRaw.toUpperCase() as TimePeriod,
    };
  }

  const twentyFourHourMatch = value.match(/^(\d{1,2}):(\d{2})$/);
  if (twentyFourHourMatch) {
    const [, hourRaw, minuteRaw] = twentyFourHourMatch;
    const numericHour = Number(hourRaw);
    if (!Number.isNaN(numericHour) && TIME_MINUTES.includes(minuteRaw)) {
      const period: TimePeriod = numericHour >= 12 ? "PM" : "AM";
      const normalizedHour = numericHour % 12 || 12;
      return {
        hour: String(normalizedHour).padStart(2, "0"),
        minute: minuteRaw,
        period,
      };
    }
  }

  return fallback;
};

const buildTimeValue = (hour: string, minute: string, period: TimePeriod) =>
  `${hour}:${minute} ${period}`;

type TimePickerInputProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function TimePickerInput({
  value,
  onChange,
  placeholder,
}: TimePickerInputProps) {
  const { hour, minute, period } = parseTimeParts(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="w-full text-left">
          <div className="relative">
            <Input
              className="tp-input pr-10 cursor-pointer"
              type="text"
              value={value || ""}
              placeholder={placeholder}
              readOnly
            />
            <Watch size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4" align="start">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-600">Hour</p>
            <Select
              value={hour}
              onValueChange={(nextHour) =>
                onChange(buildTimeValue(nextHour, minute, period))
              }
            >
              <SelectTrigger className="tp-select h-10">
                <SelectValue placeholder="Select hour" />
              </SelectTrigger>
              <SelectContent>
                {TIME_HOURS.map((hourOption) => (
                  <SelectItem key={hourOption} value={hourOption}>
                    {hourOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-600">Minute</p>
            <Select
              value={minute}
              onValueChange={(nextMinute) =>
                onChange(buildTimeValue(hour, nextMinute, period))
              }
            >
              <SelectTrigger className="tp-select h-10">
                <SelectValue placeholder="Select minute" />
              </SelectTrigger>
              <SelectContent className="max-h-56">
                {TIME_MINUTES.map((minuteOption) => (
                  <SelectItem key={minuteOption} value={minuteOption}>
                    {minuteOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-600">AM / PM</p>
            <Select
              value={period}
              onValueChange={(nextPeriod) =>
                onChange(buildTimeValue(hour, minute, nextPeriod as TimePeriod))
              }
            >
              <SelectTrigger className="tp-select h-10">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
