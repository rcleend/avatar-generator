import React from 'react';
import { Camera, Mic, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

interface DeviceSelectorProps {
  devices: MediaDeviceInfo[];
  selectedDevice: string;
  onSelectDevice: (deviceId: string) => void;
  icon: 'camera' | 'microphone';
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  devices,
  selectedDevice,
  onSelectDevice,
  icon,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-14 h-8">
          {icon === 'camera' ? (
            <Camera className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top">
        {devices.map((device) => (
          <DropdownMenuCheckboxItem
            checked={selectedDevice === device.deviceId}
            onCheckedChange={() => onSelectDevice(device.deviceId)}
            key={device.deviceId}
          >
            {device.label || `${icon === 'camera' ? 'Camera' : 'Microphone'} ${devices.indexOf(device) + 1}`}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeviceSelector;
