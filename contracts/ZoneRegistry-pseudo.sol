// Pseudocode


contract ZoneRegistry {

  struct Zone {
    // bytesX zoneID; // <- hash(zoneName, address)
    // zoneName string;
    // parent address or null;
    // approved false;
    // children bytesX[]; // <- array of zoneIDs
  }

  mapping(bytesX => Zone) zones; // <- master record of all zones
  mapping(address => bytesX[]); // <- mapping of all zoneIDs an address owns
  address[] registrants; // <- array of all addresses that have a zone registered in the system
  bytesX[] pendingZones; // <- array of zoneIDs that have not been approved


  constructor () {
    // ?
  }

  function computeZoneID(address owner, string zoneName) public return (bytesX zoneID) {
    return keccak(owner, zoneName);
  }

  function registerZone (string zoneName, address parent, ) public {

    bytesX zoneID = computeZoneID(msg.sender, zoneName);

    Zone zoneToRegister = Zone(
      zoneID,
      zoneName,
      parent,
      false,
      // empty array of bytesX[]
      )

    if (parent == "0x0") {

      if (msg.sender NOT IN registrants) {
        registrants.push(msg.sender);
        zoneToRegister.approved = true;
      }
    } else {
      pendingZones.push(zoneID);
      // alert  or event New zone?
    }

     // <- or only do this once approved
     zones[zoneID] = zoneToRegister;

  }

  function getPendingChildZones (address parent)
    public returns (
      Zone[] zones;
      /* each with address childAddress,
      string zoneName */
    ) {

      Zone[] zonesToApprove;
      // loop through pendingZones
      for (zoneID in pendingZones) {
        if (zones[zoneID].parent == parent) {
          zonesToApprove.push(zones[zoneID]);
        }
      }

      return zonesToApprove; // ?? Is this right?
        // Need to get all child addresses and zoneNames into the browser to look up 3box space.
  }

  function approveZone(address childOwner, string zoneName) public {

    bytesX zoneID = computeZoneID(childOwner, zoneName);

    // Lost of tests here - zone exists, hasn't already been approved, etc.
    require(zones[zoneID].parent == msg.sender); // approver must be zone parent

    zones[zoneID].approved = true;
    // remove zoneID from pendingZones array

    // return anything? 
  }

}
