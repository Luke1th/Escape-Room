import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Target, Lock, Shield, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Act1Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      {/* Header */}
      <div className="gmail-header p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-foreground">Money Heist: Dubai</h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secure Access Portal</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 pt-12">
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <Target className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-4xl font-bold text-black-600 mb-4">Welcome to the Heist</h2>
          <h3 className="text-3xl font-bold text-black-600 mb-4">Act 1 : Infiltration</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your mission: Infiltrate the secure vault communications and crack the access codes. 
            Each email contains a clue to unlock the next level of security.
          </p>
        </div>

        {/* Mission Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="gmail-card p-6 text-center slide-in">
            <DollarSign className="h-8 w-8 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">€2.4B</h3>
            <p className="text-muted-foreground">Target Vault Value</p>
          </Card>
          
          <Card className="gmail-card p-6 text-center slide-in" style={{animationDelay: '0.1s'}}>
            <Lock className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">3 Levels</h3>
            <p className="text-muted-foreground">Security Layers</p>
          </Card>
          
          <Card className="gmail-card p-6 text-center slide-in" style={{animationDelay: '0.2s'}}>
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Elite</h3>
            <p className="text-muted-foreground">Access Level</p>
          </Card>
        </div>

        {/* Mission Briefing */}
        <Card className="gmail-card p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3">Mission Briefing</h3>
              <div className="prose text-muted-foreground">
                <p className="mb-4">
                  Agent, this is your first stage to getting into the vault.You have gained access to the internal communication system of the Royal Mint of Dubai. 
                  The vault contains €2.4 billion in gold reserves, and we need those access codes to pass the first stage.
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
            <Button className="heist-button px-8 py-4 text-lg font-semibold">
              <Mail className="h-5 w-5 mr-3" />
              Access Secure Communications
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            🔒 This session is encrypted and monitored
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-border mt-16">
        <p className="text-xs text-muted-foreground">
          Money Heist: Dubai • Confidential Operation • Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default Act1Index;