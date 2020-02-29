// Pseudocode


contract ZoneRegistry {

  struct Zone {
    address owner;
    zoneName string;
    bytes32 zoneID; // <- hash(zoneName, address)
    parent address or null;
    approved false;
    // children bytes32[]; // <- array of zoneIDs
  }

  mapping(bytes32 => Zone) zones; // <- master record of all zones
  mapping(address => bytes32[]); // <- mapping of all zoneIDs an address owns
  address[] registrants; // <- array of all addresses that have a zone registered in the system
  bytes32[] pendingZones; // <- array of zoneIDs that have not been approved


  constructor () {
    // ?
  }

  function computeZoneID(address owner, string zoneName) public return (bytes32 zoneID) {
    return keccak(owner, zoneName);
  }

  function registerZone (string zoneName, address parent, ) public {

    bytes32 zoneID = computeZoneID(msg.sender, zoneName);

    Zone zoneToRegister = Zone(
      msg.sender,
      zoneName,
      zoneID,
      parent,
      false
      // empty array of bytes32[]
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

      Zone[] pendingChildZones;
      // loop through pendingZones
      for (zoneID in pendingZones) {
        if (zones[zoneID].parent == parent) {
          pendingChildZones.push(zones[zoneID]);
        }
      }

      return pendingChildZones; // ?? Is this right?
        // Need to get all child addresses and zoneNames into the browser to look up 3box space.
  }

  function approveZone(address childOwner, string zoneName) public {

    bytes32 zoneID = computeZoneID(childOwner, zoneName);

    // Lost of tests here - zone exists, hasn't already been approved, etc.
    require(zones[zoneID].parent == msg.sender); // approver must be zone parent

    zones[zoneID].approved = true;
    // remove zoneID from pendingZones array

    // return anything?
  }

}
