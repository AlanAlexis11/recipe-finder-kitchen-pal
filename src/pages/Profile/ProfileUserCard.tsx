import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Mail, Scale, Ruler } from "lucide-react";

export default function ProfileUserCard({ user }) {
  return (
    <CardContent className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <User className="h-4 w-4 text-gray-500" />
          <Label>Nombre:</Label>
        </div>
        <p className="text-gray-900">{user?.username || "No especificado"}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Mail className="h-4 w-4 text-gray-500" />
          <Label>Email:</Label>
        </div>
        <p className="text-gray-900">{user?.email}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Scale className="h-4 w-4 text-gray-500" />
          <Label>Peso:</Label>
        </div>
        <p className="text-gray-900">
          {user?.userProfiles?.weight ? user?.userProfiles?.weight + " kg" : "No especificado"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Ruler className="h-4 w-4 text-gray-500" />
          <Label>Altura:</Label>
        </div>
        <p className="text-gray-900">
          {user?.userProfiles?.height ? user?.userProfiles?.height + " cm" : "No especificado"}
        </p>
      </div>
    </CardContent>
  );
}
