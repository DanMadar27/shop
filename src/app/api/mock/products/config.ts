function getRandomPrice(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomImage() {
  const maxIndex = images.length - 1;
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1));

  return images[randomIndex];
}

const names = [
  "TechGizmo 5000",
  "SmartWave Watch",
  "DataSync Pro",
  "CodeMaster Keyboard",
  "CloudCharger",
  "RoboAssistant X1",
  "GigaStream Router",
  "SecureLock 360",
  "PixelCraft Camera",
  "BioFit Smart Chair",
  "EcoPower Solar Panel",
  "NexGen VR Headset",
  "FusionFlex Earbuds",
  "QuantumDrive SSD",
  "FireBlaze Gaming Mouse",
  "HealthGuard Wearable",
  "AeroDrone Explorer",
  "SleekDesk Workstation",
  "GlowTunes Bluetooth Speaker",
  "HomeGuardian Security System",
];

const descriptions = [
  "Experience cutting-edge technology with the TechGizmo 5000. Stay connected like never before.",
  "The SmartWave Watch is the perfect blend of style and functionality. Keep track of your life in style.",
  "DataSync Pro ensures your data is always in sync across all your devices, making your life easier.",
  "CodeMaster Keyboard - where precision meets comfort. Elevate your typing experience.",
  "Charge your devices with the CloudCharger. Fast and efficient charging, anytime, anywhere.",
  "RoboAssistant X1 is your personal assistant. Get things done with the power of AI.",
  "GigaStream Router - the ultimate solution for lag-free, high-speed internet at home.",
  "SecureLock 360 keeps your valuables safe with state-of-the-art security features.",
  "Capture memories with the PixelCraft Camera. Crystal-clear photos and videos await.",
  "The BioFit Smart Chair offers ergonomic comfort and health-conscious features.",
  "EcoPower Solar Panel harnesses the sun's energy to power your home sustainably.",
  "Experience virtual reality like never before with the NexGen VR Headset.",
  "FusionFlex Earbuds - premium audio quality for music lovers and audiophiles.",
  "Upgrade your storage with the lightning-fast QuantumDrive SSD.",
  "FireBlaze Gaming Mouse - your weapon of choice for epic gaming adventures.",
  "Monitor your health with the HealthGuard Wearable. Your well-being, your priority.",
  "Explore the skies with the AeroDrone Explorer. It's time for your aerial adventures.",
  "SleekDesk Workstation - where style meets productivity. Elevate your workspace.",
  "GlowTunes Bluetooth Speaker - immerse yourself in music with stunning sound quality.",
  "HomeGuardian Security System - protect what matters most with smart security.",
];

const images = [
  '/products/tech.jpg',
  '/products/smart-watch.jpg',
  '/products/camera.jpg',
  '/products/charger.jpg',
  '/products/clothes.jpg',
];

const mockProducts: { name: string, description: string; price: number, image: string }[] = [];

for (let i = 0; i < names.length; i++) {
  const price = getRandomPrice(0, 500);
  const image = getRandomImage();

  mockProducts.push({
    name: names[i],
    description: descriptions[i],
    price,
    image,
  });
}

export default mockProducts;