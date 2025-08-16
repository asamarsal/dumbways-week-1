"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/navbar";

import AnimatedList from '@/components/reactbits/animatedlist'
import { Check, ChevronsUpDown } from "lucide-react"

import axios from "axios";

import * as React from "react"

import { ChevronDownIcon } from "lucide-react"
import { Plus } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const frameworks = [
  {
    value: "ujang",
    label: "Ujang",
  },
  {
    value: "bagas",
    label: "Bagas",
  },
  {
    value: "asep",
    label: "Asep",
  },
  {
    value: "sugiono",
    label: "Sugiono",
  }
]

export default function Student() {

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    const [sports, setSports] = React.useState<any[]>([]);
    const [selectedSportId, setSelectedSportId] = React.useState<number | null>(null);
    const [notes, setNotes] = React.useState("");

    const [timeStart, setTimeStart] = React.useState("10:30:00");
    const [timeFinish, setTimeFinish] = React.useState("10:30:00");
    const [error, setError] = React.useState<string | null>(null);
    const [duration, setDuration] = React.useState<number | null>(null);

    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    const items = sports.map(sport => sport.exercise_type);

    const [value, setValue] = React.useState("")
    const [openFramework, setOpenFramework] = React.useState(false)

    React.useEffect(() => {
        async function fetchSports() {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/sport`);
            if (res.data?.data) {
            // Ambil exercise_type saja
            //   const sportItems = res.data.data.map((w: any) => w.exercise_type);
            //   setItems(sportItems);
            setSports(res.data.data);
            }
        } catch (err) {
            console.error("Gagal fetch workouts:", err);
        }
        }
        fetchSports();
    }, []);

    async function handleAddWorkout() {
        if (!selectedSportId || !date || duration === null) {
            toast.error("Pilih olahraga, tanggal, dan durasi terlebih dahulu.")
            return;
        }

        try {

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("user_id");

            if (!token) {
                toast.error("Please login first");
                return;
            }

            const payload = {
                duration,
                exercise_id: selectedSportId,
                exercise_date: date.toISOString().split("T")[0], // YYYY-MM-DD
                notes,
                created_by: Number(userId)
            };

            const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/workout`, 
            payload,
            {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            }
        );

            if (res.status === 201) {
                toast.success("Workout berhasil ditambahkan ✅")
            }
            console.log("Workout berhasil ditambahkan:", res.data);
        } catch (err) {
            toast.error("Workout gagal ditambahkan")
            console.error("Gagal menambahkan workout:", err);
        }
    }

    function handleTimeChange(start: string, finish: string) {
    const startDate = new Date(`1970-01-01T${start}`);
    const finishDate = new Date(`1970-01-01T${finish}`);

    if (finishDate < startDate) {
        setError("Waktu finish tidak boleh lebih kecil dari waktu start.");
        setDuration(null);
        } else {
        setError(null);
        const diffMs = finishDate.getTime() - startDate.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        setDuration(diffMinutes);
        }
    }

    React.useEffect(() => {
        handleTimeChange(timeStart, timeFinish);
    }, [timeStart, timeFinish]);

    return (
        <div className="font-sans min-h-screen bg-gray-50">
            <Toaster position="top-left" richColors />
            {/* Navbar */}
            <Navbar />

            {/* Konten */}
            <main className="pt-20 w-full max-w-md mx-auto px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Olahraga apa hari ini?</CardTitle>
                    </CardHeader>
                    <div className="flex gap-2 pl-4 pr-4">
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="date-picker" className="px-1">
                            Date
                            </Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date-picker"
                                        className="justify-between font-normal w-full"
                                        >
                                        {date ? date.toLocaleDateString() : "Select date"}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full overflow-hidden p-0" align="start">
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date)
                                        setOpen(false)
                                    }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="time-picker-start" className="px-1">
                            Start
                            </Label>
                            <Input
                            type="time"
                            id="time-picker-start"
                            step="1"
                            defaultValue="10:30:00"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            onChange={(e) => setTimeStart(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="time-picker-finish" className="px-1">
                            Finish
                            </Label>
                            <Input
                            type="time"
                            id="time-picker-finish"
                            step="1"
                            defaultValue="10:30:00"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            onChange={(e) => setTimeFinish(e.target.value)}
                            />
                        </div>
                    </div>

                        <div className="flex flex-col gap-2 px-4">
                            <Popover open={openFramework} onOpenChange={setOpenFramework}>
      
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openFramework}
                                    className="w-full justify-between"
                                    >
                                    {value
                                        ? frameworks.find((framework) => framework.value === value)?.label
                                        : "Select student..."}
                                    <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                    <CommandInput placeholder="Search student..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                            >
                                            {framework.label}
                                            <Check
                                                className={cn(
                                                "ml-auto",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            </CommandItem>
                                        ))}
                                        </CommandGroup>
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                    <div className="flex flex-col gap-2 px-4">

                        <AnimatedList 
                            className="flex flex-col gap-2 px-4"
                            items={items}
                            onItemSelect={(item: string, index: number) => {
                                console.log(item, index);
                                setSelectedSportId(sports[index].id);
                                setSelectedItem(item);
                            }}
                            showGradients={false}
                            enableArrowNavigation={false}
                            displayScrollbar={false}
                         />

                        {selectedItem && (
                            <div className="px-4 py-4 bg-gray-100 rounded">
                                <strong>Olahraga :</strong> {selectedItem}
                            </div>
                        )}

                        {/* Durasi */}
                        {duration !== null && !error && (
                            <div className="px-4 py-4 bg-gray-100 rounded">
                            <strong>Durasi :</strong> {duration} Menit
                            </div>
                        )}

                    </div>

                    <div className="flex flex-col gap-2 px-4">
                        <Input
                            type="text"
                            placeholder="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2 px-4">
                        <Button size="sm" onClick={handleAddWorkout}>
                            <Plus /> Add
                        </Button>
                    </div>
                </Card>
            </main>
        </div>
    );
}
