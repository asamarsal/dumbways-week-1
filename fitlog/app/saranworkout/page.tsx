"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/navbar";

import AnimatedList from '@/components/reactbits/animatedlist'

import * as React from "react"

import { ChevronDownIcon } from "lucide-react"
import { Plus } from "lucide-react"
import axios from "axios";

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

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

export default function Saranworkout() {

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    const [items, setItems] = React.useState<string[]>([]);

    // Fetch workouts dari API
  React.useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/workout`);
        if (res.data?.data) {
          // Ambil exercise_type saja
          const workoutItems = res.data.data.map((w: any) => w.exercise_type);
          setItems(workoutItems);
        }
      } catch (err) {
        console.error("Gagal fetch workouts:", err);
      }
    }
    fetchWorkouts();
  }, []);

    return (
        <div className="font-sans min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Konten */}
            <main className="pt-20 w-full max-w-md mx-auto px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Saran Workout Hari Ini!</CardTitle>
                        <CardDescription>Pilih di bawah ini.</CardDescription>
                    </CardHeader>

                    <div className="flex flex-col gap-2 px-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Pilih Olahraga</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Sports</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                checked={showStatusBar}
                                onCheckedChange={setShowStatusBar}
                                >
                                Running
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                checked={showPanel}
                                onCheckedChange={setShowPanel}
                                >
                                Basketball
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                            <AnimatedList 
                            className="flex flex-col gap-2 px-4"
                            visibleItems={1}
                            items={items}
                            onItemSelect={(item, index) => console.log(item, index)}
                            showGradients={false}
                            enableArrowNavigation={false}
                            displayScrollbar={false}
                            />
                    </div>


                    <div className="flex flex-col gap-2 px-4">
                        <Button size="sm">
                            <Plus /> Add
                        </Button>
                    </div>
                </Card>
            </main>
        </div>
    );
}
