// userstats
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Award,
  Shield,
  Star
} from "lucide-react";

const getCredibilityLevel = (score) => {
  if (score >= 90) return { level: 'Legendary Guardian', color: 'text-purple-600', bgColor: 'bg-purple-100' };
  if (score >= 75) return { level: 'Coastal Champion', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score >= 50) return { level: 'Reliable Reporter', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  return { level: 'New Guardian', color: 'text-gray-600', bgColor: 'bg-gray-100' };
};

const getNextLevelTarget = (score) => {
  if (score < 50) return 50;
  if (score < 75) return 75;
  if (score < 90) return 90;
  return 100;
};

export default function UserStats({ user, totalReports, verifiedReports, pendingReports }) {
  const credibilityScore = user?.credibility_score || 50;
  const credibilityInfo = getCredibilityLevel(credibilityScore);
  const nextTarget = getNextLevelTarget(credibilityScore);
  const progressToNext = ((credibilityScore % 25) / 25) * 100; // Progress within current tier

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Credibility Score Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Credibility Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{credibilityScore}</div>
            <Badge className={`${credibilityInfo.bgColor} ${credibilityInfo.color}`}>
              <Star className="w-3 h-3 mr-1" />
              {credibilityInfo.level}
            </Badge>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress to {nextTarget}</span>
              <span className="font-medium">{credibilityScore}/{nextTarget}</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {nextTarget > credibilityScore ? 
                `${nextTarget - credibilityScore} points to next level` :
                'Maximum level achieved!'
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Report Statistics Card */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Report Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Total Reports</p>
                  <p className="text-sm text-gray-600">All submissions</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">{totalReports}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Verified</p>
                  <p className="text-sm text-gray-600">Officially confirmed</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">{verifiedReports}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Under Review</p>
                  <p className="text-sm text-gray-600">Awaiting verification</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{pendingReports}</span>
            </div>

            {/* Accuracy Rate */}
            {totalReports > 0 && (
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Accuracy Rate</span>
                  <span className="text-sm font-bold text-purple-600">
                    {Math.round((verifiedReports / totalReports) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(verifiedReports / totalReports) * 100} 
                  className="h-2" 
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// report timline
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle,
  MapPin,
  Calendar
} from "lucide-react";
import { format } from "date-fns";

const getStatusIcon = (status) => {
  switch (status) {
    case 'verified':
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    case 'rejected':
      return <XCircle className="w-5 h-5 text-red-600" />;
    case 'investigating':
      return <AlertTriangle className="w-5 h-5 text-blue-600" />;
    default:
      return <Clock className="w-5 h-5 text-yellow-600" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'verified':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'investigating':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }
};

export default function ReportTimeline({ reports = [] }) {
  const sortedReports = reports.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Timeline</h3>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {sortedReports.map((report, index) => (
          <div key={report.id} className="relative flex gap-4 pb-8">
            {/* Timeline Dot */}
            <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm">
              {getStatusIcon(report.status)}
            </div>
            
            {/* Content */}
            <Card className="flex-1 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800 capitalize">
                      {report.type} Report
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(report.created_date), 'MMM d, yyyy \'at\' h:mm a')}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>

                {report.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {report.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{report.location?.address || 'Location not specified'}</span>
                </div>

                {report.verification_notes && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h5 className="font-medium text-blue-800 text-sm mb-1">Official Response</h5>
                    <p className="text-blue-700 text-sm">{report.verification_notes}</p>
                  </div>
                )}

                {report.credibility_score > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Credibility Score:</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {report.credibility_score} points
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}

        {sortedReports.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Reports Yet</h3>
            <p className="text-gray-500">Your report timeline will appear here once you start submitting reports.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// report card
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Eye, 
  Camera,
  Volume2,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { format } from "date-fns";

const severityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800", 
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800"
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-green-100 text-green-800",
  investigating: "bg-blue-100 text-blue-800",
  resolved: "bg-gray-100 text-gray-800",
  false_report: "bg-red-100 text-red-800"
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'verified':
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    case 'false_report':
      return <XCircle className="w-5 h-5 text-red-600" />;
    case 'investigating':
      return <AlertTriangle className="w-5 h-5 text-blue-600" />;
    default:
      return <Clock className="w-5 h-5 text-yellow-600" />;
  }
};

export default function ReportCard({ report }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Status Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
            {getStatusIcon(report.status)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1 capitalize">
                  {report.type} Report
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{report.location?.address || report.location?.district || 'Location not specified'}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge className={statusColors[report.status]}>
                  {report.status}
                </Badge>
                {report.sync_status === 'pending' && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    Syncing...
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            {report.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {report.description}
              </p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className={severityColors[report.severity]}>
                {report.severity} priority
              </Badge>
              {report.credibility_score > 0 && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {report.credibility_score} credibility points
                </Badge>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{format(new Date(report.created_date), 'MMM d, h:mm a')}</span>
                </div>
                {report.media_urls?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    <span>{report.media_urls.length} media</span>
                  </div>
                )}
                {report.voice_recording_url && (
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-4 h-4" />
                    <span>Voice note</span>
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </div>

            {/* Verification Notes */}
            {report.verification_notes && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h5 className="font-medium text-blue-800 text-sm mb-1">Official Response</h5>
                <p className="text-blue-700 text-sm">{report.verification_notes}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}