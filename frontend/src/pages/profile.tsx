import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import api from "../services/api";
import {
  FaUserCircle,
  FaEnvelope,
  FaFileAlt,
} from "react-icons/fa";

interface ProfileData {
  name: string;
  email: string;
  reports: number;
}

export default function Profile() {

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    reports: 0,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10 flex justify-center text-gray-900">

        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-2xl">

          <div className="flex flex-col items-center">

            <FaUserCircle className="text-8xl text-blue-600" />

            <h1 className="text-3xl font-bold mt-4 text-gray-900">
              {profile.name}
            </h1>

            <p className="text-gray-600">
              AI Researcher
            </p>

          </div>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">

              <FaEnvelope className="text-blue-600 text-2xl" />

              <div>
                <p className="text-gray-600">
                  Email
                </p>

                <p className="font-semibold text-gray-900">
                  {profile.email}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">

              <FaFileAlt className="text-green-600 text-2xl" />

              <div>
                <p className="text-gray-600">
                  Total Reports
                </p>

                <p className="font-semibold text-gray-900">
                  {profile.reports}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}