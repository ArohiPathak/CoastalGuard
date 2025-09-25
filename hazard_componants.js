// filter panel
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, X } from "lucide-react";

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'verified', label: 'Verified', color: 'bg-green-100 text-green-800' },
  { value: 'pending', label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'investigating', label: 'Under Investigation', color: 'bg-blue-100 text-blue-800' },
  { value: 'resolved', label: 'Resolved', color: 'bg-gray-100 text-gray-800' }
];

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'flood', label: 'Flooding' },
  { value: 'cyclone', label: 'Cyclone/Storm' },
  { value: 'erosion', label: 'Coastal Erosion' },
  { value: 'pollution', label: 'Water Pollution' },
  { value: 'tsunami', label: 'Tsunami' },
  { value: 'storm_surge', label: 'Storm Surge' },
  { value: 'other', label: 'Other' }
];

const severityOptions = [
  { value: 'all', label: 'All Severity' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
  { value: 'high', label: 'High Risk', color: 'bg-orange-100 text-orange-800' },
  { value: 'medium', label: 'Medium Risk', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'low', label: 'Low Risk', color: 'bg-green-100 text-green-800' }
];

const timeframeOptions = [
  { value: 'all', label: 'All Time' },
  { value: '1h', label: 'Last Hour' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' }
];

export default function FilterPanel({ filters, onFilterChange, reportCount = 0 }) {
  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      status: 'all',
      type: 'all', 
      severity: 'all',
      timeframe: 'all'
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-3">
        <Filter className="w-4 h-4 text-gray-500" />
        
        <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  {option.color && <div className={`w-2 h-2 rounded-full ${option.color.split(' ')[0]}`} />}
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.severity} onValueChange={(value) => updateFilter('severity', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            {severityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  {option.color && <div className={`w-2 h-2 rounded-full ${option.color.split(' ')[0]}`} />}
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.timeframe} onValueChange={(value) => updateFilter('timeframe', value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            {timeframeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Mobile Filter Popover */}
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filters {hasActiveFilters && `(${Object.values(filters).filter(v => v !== 'all').length})`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Filter Reports</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                    <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Hazard Type</label>
                    <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {typeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Severity</label>
                    <Select value={filters.severity} onValueChange={(value) => updateFilter('severity', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {severityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Timeframe</label>
                    <Select value={filters.timeframe} onValueChange={(value) => updateFilter('timeframe', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeframeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {reportCount} {reportCount === 1 ? 'report' : 'reports'}
        </Badge>
      </div>
    </div>
  );
}

// hazardmap

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Clock, Shield } from "lucide-react";
import { format } from 'date-fns';

// Custom marker component
const HazardMarkers = ({ reports }) => {
  const map = useMap();

  useEffect(() => {
    if (reports.length > 0) {
      // Fit map to show all markers
      const bounds = reports
        .filter(r => r.location?.latitude && r.location?.longitude)
        .map(r => [r.location.latitude, r.location.longitude]);
      
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] }); // Increased padding
      }
    }
  }, [reports, map]);

  return (
    <>
      {reports
        .filter(report => report.location?.latitude && report.location?.longitude)
        .map(report => (
          <Marker
            key={report.id}
            position={[report.location.latitude, report.location.longitude]}
          >
            <Popup>
              <div className="min-w-64 p-2">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    report.severity === 'critical' ? 'text-red-600' :
                    report.severity === 'high' ? 'text-orange-600' :
                    report.severity === 'medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`} />
                  <h3 className="font-bold text-gray-800 capitalize">
                    {report.type} Alert
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Badge className={
                      report.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      report.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {report.severity}
                    </Badge>
                    <Badge className={
                      report.status === 'verified' ? 'bg-green-100 text-green-800' :
                      report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {report.status === 'verified' && <Shield className="w-3 h-3 mr-1" />}
                      {report.status}
                    </Badge>
                  </div>
                  
                  {report.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {report.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{report.location.address || 'Location not specified'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{format(new Date(report.created_date), 'MMM d, h:mm a')}</span>
                  </div>

                  {report.media_urls && report.media_urls.length > 0 && (
                    <div className="mt-2">
                      <img 
                        src={report.media_urls[0]} 
                        alt="Report evidence"
                        className="w-full h-24 object-cover rounded"
                      />
                      {report.media_urls.length > 1 && (
                        <p className="text-xs text-gray-500 mt-1">
                          +{report.media_urls.length - 1} more files
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default function HazardMap({ reports = [] }) {
  const [mapReady, setMapReady] = useState(false);

  // Default center (India's coastline)
  const defaultCenter = [20.5937, 78.9629];
  const defaultZoom = 5;

  const getHotspotData = () => {
    // Group reports by location for hotspot visualization
    const locationGroups = {};
    
    reports.forEach(report => {
      if (report.location?.latitude && report.location?.longitude) {
        const key = `${report.location.latitude.toFixed(2)}_${report.location.longitude.toFixed(2)}`;
        if (!locationGroups[key]) {
          locationGroups[key] = {
            lat: report.location.latitude,
            lng: report.location.longitude,
            reports: [],
            maxSeverity: 'low'
          };
        }
        locationGroups[key].reports.push(report);
        
        // Update max severity
        const severityLevels = ['low', 'medium', 'high', 'critical'];
        if (severityLevels.indexOf(report.severity) > severityLevels.indexOf(locationGroups[key].maxSeverity)) {
          locationGroups[key].maxSeverity = report.severity;
        }
      }
    });

    return Object.values(locationGroups);
  };

  const hotspots = getHotspotData();
  const recentReports = reports.filter(r => {
    const reportDate = new Date(r.created_date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return reportDate > yesterday;
  });

  return (
    <div className="space-y-6">
      {/* Map Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{reports.length}</p>
            <p className="text-sm text-gray-600">Total Reports</p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">
              {reports.filter(r => r.severity === 'critical').length}
            </p>
            <p className="text-sm text-gray-600">Critical Alerts</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'verified').length}
            </p>
            <p className="text-sm text-gray-600">Verified</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">{recentReports.length}</p>
            <p className="text-sm text-gray-600">Last 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <Card className="bg-white shadow-xl border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Live Hazard Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] rounded-lg overflow-hidden border-2 border-blue-100">
            <MapContainer
              center={defaultCenter}
              zoom={defaultZoom}
              className="h-full w-full"
              whenReady={() => setMapReady(true)}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {mapReady && <HazardMarkers reports={reports} />}
            </MapContainer>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Click on markers to view detailed report information
          </div>
        </CardContent>
      </Card>

      {/* Hotspot Analysis */}
      {hotspots.length > 0 && (
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Identified Hotspots ({hotspots.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotspots
                .sort((a, b) => b.reports.length - a.reports.length)
                .slice(0, 6)
                .map((hotspot, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">
                        Hotspot #{index + 1}
                      </h4>
                      <Badge className={
                        hotspot.maxSeverity === 'critical' ? 'bg-red-500 text-white' :
                        hotspot.maxSeverity === 'high' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-white'
                      }>
                        {hotspot.maxSeverity}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📍 {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}</p>
                      <p>📊 {hotspot.reports.length} reports</p>
                      <p>🔥 Max severity: {hotspot.maxSeverity}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


// hazardcard
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  User, 
  Eye, 
  ExternalLink,
  Shield,
  AlertTriangle,
  Camera,
  Volume2,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const severityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200"
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-green-100 text-green-800",
  investigating: "bg-blue-100 text-blue-800",
  resolved: "bg-gray-100 text-gray-800",
  false_report: "bg-red-100 text-red-800"
};

const typeColors = {
  flood: "bg-blue-100 text-blue-800",
  cyclone: "bg-purple-100 text-purple-800",
  erosion: "bg-orange-100 text-orange-800",
  pollution: "bg-red-100 text-red-800",
  tsunami: "bg-red-100 text-red-800",
  storm_surge: "bg-indigo-100 text-indigo-800",
  other: "bg-gray-100 text-gray-800"
};

export default function HazardCard({ report, currentUser }) {
  const [showDetails, setShowDetails] = useState(false);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-lg transition-all duration-200 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Severity Indicator */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              report.severity === 'critical' ? 'bg-red-100' :
              report.severity === 'high' ? 'bg-orange-100' :
              report.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              {getSeverityIcon(report.severity)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-1 capitalize">
                    {report.type} Alert
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
                  {report.status === 'verified' && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <Shield className="w-3 h-3 mr-1" />
                      <span>Official</span>
                    </div>
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
                <Badge variant="outline" className={typeColors[report.type]}>
                  {report.type}
                </Badge>
                {report.credibility_score > 0 && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    {report.credibility_score}% credible
                  </Badge>
                )}
              </div>

              {/* Actions & Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(report.created_date), 'MMM d, h:mm a')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Report #{report.id?.slice(-6) || 'N/A'}</span>
                  </div>
                  {report.media_urls?.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Camera className="w-4 h-4" />
                      <span>{report.media_urls.length}</span>
                    </div>
                  )}
                  {report.voice_recording_url && (
                    <Volume2 className="w-4 h-4" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Voting buttons */}
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="ml-1">{report.upvotes || 0}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                      <ThumbsDown className="w-4 h-4" />
                      <span className="ml-1">{report.downvotes || 0}</span>
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetails(true)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 capitalize">
              {getSeverityIcon(report.severity)}
              {report.type} Hazard Report
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Status and Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className={statusColors[report.status]}>
                {report.status}
              </Badge>
              <Badge className={severityColors[report.severity]}>
                {report.severity} severity
              </Badge>
              <Badge className={typeColors[report.type]}>
                {report.type}
              </Badge>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{report.description}</p>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-semibold mb-2">Location</h4>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" />
                <span>{report.location?.address || 'Address not specified'}</span>
              </div>
              {report.location?.district && (
                <p className="text-sm text-gray-600 mt-1">
                  {report.location.district}, {report.location.state}
                </p>
              )}
              {report.location?.latitude && report.location?.longitude && (
                <p className="text-xs text-gray-500 mt-1">
                  Coordinates: {report.location.latitude.toFixed(6)}, {report.location.longitude.toFixed(6)}
                </p>
              )}
            </div>

            {/* Media */}
            {report.media_urls?.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Media Attachments</h4>
                <div className="grid grid-cols-2 gap-2">
                  {report.media_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Report media ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Voice Recording */}
            {report.voice_recording_url && (
              <div>
                <h4 className="font-semibold mb-2">Voice Recording</h4>
                <audio controls className="w-full">
                  <source src={report.voice_recording_url} type="audio/wav" />
                  Your browser does not support audio playback.
                </audio>
              </div>
            )}

            {/* Verification Notes */}
            {report.verification_notes && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Official Verification</h4>
                <p className="text-blue-700">{report.verification_notes}</p>
              </div>
            )}

            {/* Report Meta */}
            <div className="border-t pt-4 text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Reported:</span>
                  <span className="ml-2">{format(new Date(report.created_date), 'PPP \'at\' p')}</span>
                </div>
                <div>
                  <span className="font-medium">Report ID:</span>
                  <span className="ml-2">#{report.id?.slice(-8) || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}