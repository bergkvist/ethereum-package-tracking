pragma solidity ^0.5.1;

contract PackageTracking {
    struct Place {
        bool exists;
        string country;
        string location;
    }
    
    struct Package {
        address sentBy;
        string destination;
    }
    
    struct Scan {
        address placeOwner;
        uint packageId;
        uint timestamp;  // block number
        string country;
        string location;
    }
    
    Package[] packages;
    Scan[] scans;         
    
    mapping (address => Place) ownerToPlace;
    mapping (address => uint[]) placeOwnerToScanIds;
    mapping (uint => uint[]) packageIdToScanIds;
    
    function setPlace(string memory _country, string memory _location) public {
        ownerToPlace[msg.sender].country = _country;
        ownerToPlace[msg.sender].location = _location;
        ownerToPlace[msg.sender].exists = true;
    }
    
    function createPackage(string memory _destination) public returns (uint) {
        uint packageId = packages.push(Package(msg.sender, _destination)) - 1;
        return packageId;
    }
    
    function scanPackage(uint _packageId) public returns (uint) {
        Place memory place = ownerToPlace[msg.sender];
        require(_packageId < packages.length, "packageId does not exist");
        require(place.exists, "Place has not been set");
        
        uint scanId = scans.push(Scan(msg.sender, _packageId, block.number, place.country, place.location)) - 1;
        placeOwnerToScanIds[msg.sender].push(scanId);
        packageIdToScanIds[_packageId].push(scanId);
            
        return scanId;
    }
    
    function getPlace() public view returns (string memory, string memory) {
        require(ownerToPlace[msg.sender].exists, "Place has not been set");
        Place memory place = ownerToPlace[msg.sender];
        return (place.country, place.location);
    }
    
    function getPackageById(uint _packageId) public view returns (address, string memory) {
        require(_packageId < packages.length, "packageId does not exist");
        Package memory p = packages[_packageId];
        return (p.sentBy, p.destination);
    }
    
    function getScanById(uint _scanId) public view returns (address, uint, uint, string memory, string memory) {
        require(_scanId < scans.length, "scanId does not exist");
        Scan memory s = scans[_scanId];
        return (s.placeOwner, s.packageId, s.timestamp, s.country, s.location);
    }
    
    function getScanIdsByPackageId(uint _packageId) public view returns (uint[] memory) {
        require(_packageId < packages.length, "packageId does not exist");
        return packageIdToScanIds[_packageId];
    }
    
    function getScanIds() public view returns (uint[] memory){
        require(ownerToPlace[msg.sender].exists, "Place has not been set");
        return placeOwnerToScanIds[msg.sender];
    }
}