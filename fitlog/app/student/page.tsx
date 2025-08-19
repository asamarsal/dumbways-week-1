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
import { Search } from "lucide-react"

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

import loadingworld from "../src/animations/loadingworld.json";

import Lottie from "lottie-react";

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

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

    const [selectedSportName, setSelectedSportName] = React.useState("")
    const [loading, setLoading] = React.useState(true);

    const [students, setStudents] = React.useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = React.useState("");
    const [openStudent, setOpenStudent] = React.useState(false);

    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<any[]>([]);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    const [selectedStudentId, setSelectedStudentId] = React.useState<number | null>(null);
    
    const [selectednewStudent, setSelectednewStudent] = React.useState("");
    const [selectednewStudentId, setSelectednewStudentId] = React.useState<number | null>(null);
    

    React.useEffect(() => {
        async function fetchSports() {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/sport`);
            if (res.data?.data) {
            setSports(res.data.data);
            }
        } catch (err) {
            console.error("Gagal fetch workouts:", err);
        }
        }
        fetchSports();
    }, []);

    React.useEffect(() => {
        async function fetchStudents() {
            try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/mentorship/students`,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }
            );
            if (res.data?.data) {
                setStudents(res.data.data);
            }
            } catch (err) {
            console.error("Failed to fetch students:", err);
            }
        }
        fetchStudents();
        }, []);

    async function handleAddWorkout() {
    if (!selectedSportId || !date || duration === null || !selectedStudent) {
        toast.error("Pilih olahraga, tanggal, durasi, dan student terlebih dahulu.")
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const mentorId = Number(localStorage.getItem("user_id")); 

        if (!token || !mentorId) {
            toast.error("Please login first");
            return;
        }

        // Find the selected student from students array
        const selectedMentorship = students.find(
            (mentorship) => mentorship.member.username === selectedStudent
        );

        if (!selectedMentorship) {
            toast.error("Selected student not found");
            return;
        }

        const payload = {
            duration,
            exercise_id: selectedSportId,
            exercise_date: date.toISOString().split("T")[0],
            notes
        };

        console.log("Selected Student ID:", selectedStudentId);

        console.log("Sending payload:", payload);

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/mentorship/students/${selectedStudentId}/workouts`,
            payload,
            {
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            }
        );

        if (res.status === 201) {
            toast.success("Workout berhasil ditambahkan ✅");
            // Reset form
            setSelectedStudent("");
            setSelectedStudentId(null);
            setDate(undefined);
            setNotes("");
            setDuration(null);
            setSelectedSportId(null);
            setSelectedSportName("");
        }

    } catch (err: any) {
        console.error("Error details:", err.response?.data || err);
        toast.error(err.response?.data?.message || "Workout gagal ditambahkan");
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

    const handleSearch = async (value: string) => {
        setSearchQuery(value);
        if (value.length > 0) {
            setIsSearchOpen(true);
            try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/mentorship/search-members?username=${value}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }
            );
            if (res.data?.data) {
                setSearchResults(res.data.data);
            }
            } catch (err) {
            console.error("Failed to search members:", err);
            toast.error("Failed to search members");
            }
        } else {
            setIsSearchOpen(false);
            setSearchResults([]);
        }
    };

    const handleAddMentorship = async (memberId: number) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/mentorship`,
            { memberId },
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
            );

            if (res.status === 201) {
                toast.success("Student added successfully!");
            }
        } catch (err) {
            console.error("Failed to add student:", err);
            toast.error("Failed to add student");
        }
    };
    

    return (
        <div className="font-sans min-h-screen bg-gray-50">
            <Toaster position="top-left" richColors />

            <Navbar />

            <div
                      className="absolute inset-0 -z-10"
                      style={{
                        background: "#ffffff",
                        backgroundImage: `
                          radial-gradient(
                            circle at top center,
                            rgba(173, 109, 244, 0.5),
                            transparent 70%
                          )
                        `,
                        filter: "blur(80px)",
                        backgroundRepeat: "no-repeat",
                      }}
                    />

            {/* Konten */}
            <main className="pt-20 w-full max-w-6xl mx-auto px-4 gap-4">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <Card className="w-full h-fit">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold mb-6">
                                Add students to your class?
                            </CardTitle>
                            
                            <div className="space-y-2">
                                <Command className="rounded-lg border">
                                    <CommandInput 
                                        placeholder="Search new students..." 
                                        onValueChange={(value) => handleSearch(value)}
                                    />
                                {isSearchOpen && (
                                    <CommandList>
                                        <CommandEmpty>
                                            {searchQuery ? "No students found." : "Type to search students..."}
                                        </CommandEmpty>
                                        <CommandGroup>
                                        {searchResults.map((member) => (
                                            <CommandItem
                                            key={member.id}
                                            value={member.username}
                                            onSelect={() => {
                                                setSelectednewStudentId(member.id);
                                                setSelectednewStudent(member.username); // Tambahkan ini agar tampil
                                                setIsSearchOpen(false);
                                            }}
                                            >
                                            <div className="flex items-center justify-between w-full">
                                                <div>
                                                    <p className="font-medium">{member.username}</p>
                                                    <p className="text-sm text-gray-600">{member.email}</p>
                                                </div>
                                            </div>
                                            </CommandItem>
                                        ))}
                                        </CommandGroup>
                                </CommandList>
                                )}
                            </Command>
                            {selectednewStudent && (
                                <div className="px-4 py-4 bg-gray-100 rounded">
                                    <strong>Student :</strong> {selectednewStudent}
                                </div>
                            )}
                            {searchResults.length > 0 && ( // Only show button when there are results
                                <Button 
                                    className="w-full" 
                                    onClick={() => handleAddMentorship(searchResults[0].id)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Student
                                </Button>
                            )}
                            </div>
                        </CardHeader>
                    </Card>
                    
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
                                            {selectedSportName || "Select sports..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] overflow-hidden p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search sports..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No sports found.</CommandEmpty>
                                                <CommandGroup>
                                                    {sports.map((sport) => (
                                                        <CommandItem
                                                            key={sport.id}
                                                            value={sport.exercise_type}
                                                            onSelect={(currentValue) => {
                                                                setSelectedSportName(currentValue)
                                                                setSelectedSportId(sport.id)
                                                                setSelectedItem(sport.exercise_type)
                                                                setOpenFramework(false)
                                                            }}
                                                        >
                                                            {sport.exercise_type}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    selectedSportName === sport.exercise_type ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <Popover open={openStudent} onOpenChange={setOpenStudent}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openStudent}
                                            className="w-full justify-between"
                                        >
                                            {selectedStudent || "Select student..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] overflow-hidden p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search students..." className="h-8" />
                                        <CommandList>
                                        <CommandEmpty>No students found.</CommandEmpty>
                                        <CommandGroup>
                                            {students.map((mentorship) => (
                                            <CommandItem
                                                key={mentorship.member.id}
                                                value={mentorship.member.username}
                                                onSelect={(currentValue) => {
                                                setSelectedStudent(currentValue);
                                                // Store student ID for workout assignment
                                                setSelectedStudentId(mentorship.member.id);
                                                console.log("ID :", mentorship.member.id);
                                                console.log("ID :", mentorship.member.username);
                                                setOpenStudent(false);
                                                }}
                                            >
                                                {mentorship.member.username}
                                                <Check
                                                className={cn(
                                                    "ml-auto",
                                                    selectedStudent === mentorship.member.username ? "opacity-100" : "opacity-0"
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

                            {selectedItem && (
                                <div className="px-4 py-4 bg-gray-100 rounded">
                                    <strong>Olahraga :</strong> {selectedItem}
                                </div>
                            )}

                            {selectednewStudent && (
                                <div className="px-4 py-4 bg-gray-100 rounded">
                                    <strong>Student :</strong> {selectedStudent}
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

                    <Card className="w-full h-fit">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold mb-6">
                            Your students activity...
                            </CardTitle>
                            <form className="space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Username</Label>
                                    <Input 
                                        id="username" 
                                        placeholder="username"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                            </form>
                        </CardHeader>
                    </Card>

                </div>
        </main>
    </div>
    );
}
