"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import axios from "axios";
import * as React from "react";
import { format } from "date-fns"; // For date formatting
import { Trash2 } from "lucide-react"

import Lottie from "lottie-react";
import loadingworld from "../src/animations/loadingworld.json";
import emptyanimation from "../src/animations/emptyanimation.json";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Sport {
  id: number;
  exercise_type: string;
  info: string;
}

interface Workout {
  id: number;
  exercise_id: number;
  duration: number;
  exercise_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  createdByUser: {
    id: number;
    name: string;
    username: string;
  };
}

import { Button } from "@/components/ui/button"

export default function Progress() {
  const [workouts, setWorkouts] = React.useState<Workout[]>([]);
  const [sports, setSports] = React.useState<Sport[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [editingNotes, setEditingNotes] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchWorkouts() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authenticated");
          return;
        }

        const [workoutsRes, sportsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/workout`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/sport`, {
          }),
        ]);

        if (workoutsRes.data?.data && sportsRes.data?.data) {
          setWorkouts(workoutsRes.data.data);
          setSports(sportsRes.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
        setError("Failed to load workouts");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);
  

  // Function to get sport name from exercise_id
  const getSportType = (exerciseId: number) => {
    const sport = sports.find(s => s.id === exerciseId);
    return sport?.exercise_type || "Unknown";
  };

  // Add delete handler
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/workout/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove workout from state
      setWorkouts(workouts.filter(w => w.id !== id));
    } catch (err) {
      console.error("Failed to delete workout:", err);
    }
  };

  const handleUpdateNotes = async (workoutId: number, notes: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/workout/${workoutId}`,
        { notes },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.status === 200) {
        // Update the workout in state
        setWorkouts(workouts.map(w => 
          w.id === workoutId ? { ...w, notes: notes } : w
        ));
      }
    } catch (err) {
      console.error("Failed to update notes:", err);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-18 w-full max-w-7xl mx-auto px-4"> {/* Changed max-w-xl to max-w-7xl */}
        <p className="text-xl font-bold">Workout Plan</p>
        <p className="pb-2">Your workout activities</p>

        {loading && 
          <div className="flex items-center justify-center">
            <Lottie 
              animationData={loadingworld} 
              loop={true}
              style={{ width: 350, height: 350 }}
            />
          </div>
        }

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && workouts.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <Lottie 
              animationData={emptyanimation} 
              loop={true}
              style={{ width: 350, height: 350 }}
            />
            <p className="text-gray-500 text-center mt-4">
              No workouts found. Start by adding your first workout!
            </p>
          </div>
        )}

        {!loading && !error && workouts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Added grid-cols classes */}
            {workouts.map((workout) => (
              <Card key={workout.id}>
                <CardHeader className="p-4 pt-0 pb-0">
                  <CardTitle className="text-lg">
                    {format(new Date(workout.exercise_date), "EEEE")}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {format(new Date(workout.exercise_date), "d MMMM yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0"> {/* Reduced padding */}
                  <div className="space-y-2 text-sm"> {/* Reduced text size */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exercise:</span>
                      <span>{getSportType(workout.exercise_id)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>{workout.duration} min</span>
                    </div>
                    {workout.notes && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Notes:</span>
                        <span className="text-right flex-1 ml-2">{workout.notes}</span>
                      </div>
                    )}
                    {/* <div className="flex justify-between text-xs text-gray-500">
                      <span>By:</span>
                      <span>{workout.createdByUser.username}</span>
                    </div> */}
                    <div className="flex flex-row items-center justify-between w-full pb-0">

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Info</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateNotes(workout.id, editingNotes);
                          }}>
                            <DialogHeader>
                              <DialogTitle>{format(new Date(workout.exercise_date), "EEEE")}</DialogTitle>
                              <DialogDescription>
                                {format(new Date(workout.exercise_date), "d MMMM yyyy")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="flex flex-row justify-between">
                                <Label htmlFor="exercise-1">Exercise : </Label>
                                <p className="text-sm">{getSportType(workout.exercise_id)}</p>
                              </div>
                              <div className="flex flex-row justify-between">
                                <Label htmlFor="duration-1">Duration : </Label>
                                <p className="text-sm">{workout.duration} Minutes</p>
                              </div>
                              <div className="flex flex-row justify-between">
                                <Label htmlFor="notes-1">Notes : </Label>
                                <Input 
                                  className="w-40 text-sm" 
                                  defaultValue={workout.notes}
                                  onChange={(e) => setEditingNotes(e.target.value)}
                                />
                              </div>
                              <div className="flex flex-row justify-between">
                                <Label htmlFor="notes-1">Photo : </Label>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button type="submit">Save changes</Button>
                              </DialogClose>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button 
                            className="text-red hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account
                              and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(workout.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
      </main>
    </div>
  );
}