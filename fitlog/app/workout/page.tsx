"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/navbar";

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

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

export default function Dashboard() {

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    return (
        <div className="font-sans min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Konten */}
            <main className="pt-20 w-full max-w-md mx-auto px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Olahraga apa hari ini?</CardTitle>
                        <CardDescription>Pilih di bawah ini.</CardDescription>
                    </CardHeader>
                    <div className="flex gap-2 pl-4 pr-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date-picker" className="px-1">
                            Date
                            </Label>
                            <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                variant="outline"
                                id="date-picker"
                                className="w-32 justify-between font-normal"
                                >
                                {date ? date.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
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
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="time-picker-finish" className="px-1">
                            Finish
                            </Label>
                            <Input
                            type="Sta"
                            id="time-picker-finish"
                            step="1"
                            defaultValue="10:30:00"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                        </div>
                    </div>

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
                    </div>

                    <div className="flex flex-col gap-2 px-4">
                        <Input type="text" placeholder="Notes" />
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
