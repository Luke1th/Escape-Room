import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Target, Lock, Shield, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Act1Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/mask.png"
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
            <h1 className="text-2xl font-bold text-white">Money Heist: Dubai</h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Shield className="h-4 w-4 text-green-400" />
            <span>Secure Access Portal</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 pt-12">
        <div className="text-center mb-12 fade-in">
          <motion.img
            src="/mask.png"
            className="w-40 mx-auto mb-3"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="text-4xl font-bold text-white mb-4">Welcome to the Heist</h2>
          <h3 className="text-3xl font-bold text-white mb-4">Infiltration</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your mission: Infiltrate the secure vault communications and crack the access codes.
            Each email contains a clue to unlock the next level of security.
          </p>
        </div>

        {/* Mission Stats (commented out as in your original) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Uncomment and adjust if needed */}
        </div>

        {/* Mission Briefing */}
        <Card className="bg-gray-800 border-gray-700 p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-3">Mission Briefing</h3>
              <div className="prose text-gray-300">
                <p className="mb-4">
                  Agent, this is your first stage to getting into the vault. You have gained access to the internal communication system of the Al Mazhar Bank in Dubai.
                  The vault contains the Desert Star Diamond worth 500 million dollars, and we need those access codes to pass the first stage.
                </p>
                <p className="mb-4">
                  <strong>Your objectives:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Decrypt 3 secure email communications</li>
                  <li>Extract vault access codes from each message</li>
                  <li>Solve the puzzles to unlock the next security level</li>
                  <li>Complete the heist without triggering alarms</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Link to="/infiltration">
            <Button className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg font-semibold">
              <Mail className="h-5 w-5 mr-3" />
              Access Secure Communications
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            🔒 This session is encrypted and monitored
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-700 mt-16">
        <p className="text-xs text-gray-400">
          Money Heist: Dubai • Confidential Operation • Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default Act1Index;
