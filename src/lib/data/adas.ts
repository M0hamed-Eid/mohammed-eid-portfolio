/**
 * The ADAS graduation project spans five repositories under the V2ADAS
 * organisation. Everything here is drawn from those repositories and from the
 * project's own documentation — see each subsystem's `repo` link.
 */

export interface AdasSubsystem {
  name: string;
  repo: string;
  role: string;
  language: string;
  /** Rough scale of the codebase, from the GitHub language breakdown. */
  size: string;
  summary: string;
  highlights: string[];
  /** Whether Mohammed owned, co-owned, or integrated with this subsystem. */
  ownership: "Owned" | "Co-owned" | "Integrated";
}

export const adasOverview = {
  title: "Advanced Driver Assistance Systems",
  shortTitle: "ADAS",
  subtitle: "Graduation Project — a complete autonomous driving stack, built from bare metal",
  period: "Oct 2023 — Aug 2024",
  role: "Team Lead — Software Architecture & Computer Vision",
  grade: "A+",
  mentor: "Valeo",
  sponsor: "ITIDA — Egypt Makes Electronics (EME)",
  rank: "5th of ~60 graduation projects (Value competition)",
  org: "https://github.com/V2ADAS",
  summary:
    "A scaled research vehicle that perceives its surroundings with an eight-sensor ultrasonic ring, estimates its own pose by fusing an IMU with a magnetometer and wheel odometry, plans geometric parking trajectories, tracks them closed-loop, brakes autonomously for obstacles, and streams live telemetry to a desktop cockpit that redraws a map of the world around it.",
  problem:
    "Driver-assistance features are usually demonstrated in simulation, where perception is clean and compute is free. We set out to build the same capability stack on real hardware: noisy ultrasonic echoes, a drifting IMU, a microcontroller with no operating system, and a hard real-time budget. Nothing could be imported — every driver from GPIO up to the parking planner had to be written by hand.",
  stats: [
    { value: "5", label: "Repositories" },
    { value: "8", label: "Ultrasonic sensors" },
    { value: "~800KB", label: "Hand-written C" },
    { value: "A+", label: "Final grade" },
  ],
};

/** The end-to-end signal path, from echo to actuation. */
export const adasSignalChain = [
  {
    label: "Perceive",
    detail: "8-sensor ultrasonic ring + MPU6050 IMU + HMC5883L compass + wheel encoders",
    icon: "Radar",
  },
  {
    label: "Filter & Localise",
    detail: "Confidence-weighted echo filtering, four-mode yaw estimation, dead-reckoned pose",
    icon: "Waves",
  },
  {
    label: "Decide",
    detail: "Threat laddering, scenario selection, circle–line–circle trajectory generation",
    icon: "Cpu",
  },
  {
    label: "Track & Actuate",
    detail: "Closed-loop path following onto DC drive motors and steering servo",
    icon: "Car",
  },
  {
    label: "Report",
    detail: "UART → ESP32 → TCP/JSON → Qt cockpit with a live surroundings map",
    icon: "MonitorSmartphone",
  },
];

export const adasSubsystems: AdasSubsystem[] = [
  {
    name: "Embeddedians — Vehicle ECU Firmware",
    repo: "https://github.com/V2ADAS/Embeddedians",
    role: "Main control unit (STM32 BlackPill)",
    language: "C",
    size: "~400 KB of C",
    ownership: "Co-owned",
    summary:
      "The car's brain. A strictly layered bare-metal firmware — no RTOS, no vendor HAL — where every register-level driver was written in-house and every feature is a thin application on top of a stable abstraction boundary.",
    highlights: [
      "Four-layer architecture: LIB (typed primitives, bit math) → MCAL (register-level microcontroller drivers) → HAL (device drivers) → APP (driving features).",
      "MCAL written from the reference manual up: GPIO, EXTI, I2C, SPI, USART, TIMER, SysTick, NVIC, RCC clock tree, the independent watchdog, and the floating-point unit.",
      "HAL device drivers for the ultrasonic ring, steering servo, DC drive motors, character LCD, HMC5883L magnetometer, MPU6050 IMU, and EEPROM persistence.",
      "APP layer implements auto parking, personal parking, collision avoidance, path tracking, motion planning, odometry, reverse assist, and scenario selection.",
    ],
  },
  {
    name: "IO_Modules — Software Interface Contracts",
    repo: "https://github.com/V2ADAS/IO_Modules",
    role: "Architecture boundary between perception and control",
    language: "C",
    size: "8 header modules",
    ownership: "Owned",
    summary:
      "The seam that let a vision team and an embedded team build against each other before either side existed. Pure-header, function-pointer 'interfaces' in C that define what perception may ask of the vehicle and what the vehicle promises to report — so either half could be replaced or stubbed without touching the other.",
    highlights: [
      "`MLLayer` — the perception contract: enable/disable lane detection on an interval, handle a lane position, enter slot-search mode, receive a found parking slot, and receive a graded collision threat.",
      "`CollisionThreat` is a five-level ladder (none → low → medium → high → imminent) rather than a boolean, so downstream braking can be proportional instead of binary.",
      "`CarControl` and `CarMeasurements` — the actuation and telemetry contracts: motor speed and direction, forced braking, steering angle, indicator state; wheel rotation, accelerometer, compass, and IMU callbacks.",
      "`Ultrasonic` models each sensor with its physical `offsetX`/`offsetY` on the chassis, and takes vehicle speed and encoder value when sampling — so readings can be motion-compensated rather than treated as static.",
      "`UltrasonicFilter` returns a `FilteredReading { reading, confidence }` pair, forcing every consumer to reason about measurement uncertainty; `getDimensions` turns a sweep of echoes into a 2-D point cloud of the surroundings.",
    ],
  },
  {
    name: "ESP — Wireless Telemetry Bridge",
    repo: "https://github.com/V2ADAS/ESP",
    role: "ESP32 link between the vehicle and the cockpit",
    language: "C / Assembly",
    size: "~320 KB of C",
    ownership: "Integrated",
    summary:
      "The vehicle carries its own Wi-Fi access point. An ESP32 bridges the STM32's UART telemetry onto a TCP socket, so the desktop cockpit can stream sensor state and push control commands with no infrastructure beyond the car itself.",
    highlights: [
      "ESP32 acts as a soft access point; the operator's machine joins the car's network and opens a TCP port — no router, no pairing, no internet.",
      "Bidirectional transport: telemetry frames out of the vehicle, control and mode-selection commands back in.",
      "Carries a second STM32 node running the same LIB/MCAL/HAL/APP stack, used for transmit-side experiments and multi-node testing.",
      "Telemetry frame carries all eight ultrasonic ranges, total distance travelled, and both compass and IMU yaw — so the cockpit can cross-check heading sources in real time.",
    ],
  },
  {
    name: "MapDrawing — Operator Cockpit & Live Mapping",
    repo: "https://github.com/V2ADAS/MapDrawing",
    role: "Qt/QML desktop HMI",
    language: "C++ / QML / Python",
    size: "~58 KB across C++, QML and Python",
    ownership: "Integrated",
    summary:
      "A Qt Quick cockpit that does three things at once: sends control signals to the car, reads its sensor stream, and plots a live map of what the ultrasonic ring can see around the vehicle.",
    highlights: [
      "Qt Quick / QML interface with automotive-style controls, device discovery, and a Wi-Fi connection panel.",
      "Sensor telemetry arrives as JSON over TCP and is handed to a Python plotting process that renders the surroundings map.",
      "Qt Bluetooth Low Energy classes (device, service, and characteristic discovery) alongside the TCP path, for short-range control experiments.",
      "Built with QMake and CMake side by side, with a documented migration path between them.",
    ],
  },
  {
    name: "CV-DL — Computer Vision & Deep Learning Track",
    repo: "https://github.com/V2ADAS/CV-DL",
    role: "Vision workstream",
    language: "Python / OpenCV",
    size: "Study and prototyping repository",
    ownership: "Owned",
    summary:
      "The vision workstream I led: lane keeping, automatic emergency braking, and traffic-sign detection. This repository holds the team's OpenCV groundwork and study material; the vision modules integrate with the rest of the vehicle through the `MLLayer` contract defined in IO_Modules rather than by calling into the firmware directly.",
    highlights: [
      "Lane keeping: detect lane position from the camera and emit a lane-position update the control side can steer against.",
      "Automatic emergency braking: grade obstacle proximity into the five-level collision-threat ladder and hand it to the vehicle's braking path.",
      "Traffic-sign detection feeding the vehicle's scenario and speed logic.",
      "Deliberately decoupled: every vision output crosses the `MLLayer` boundary, so the perception stack can run on a companion computer while the STM32 keeps hard real-time control.",
    ],
  },
];

export interface AdasCapability {
  name: string;
  detail: string;
  icon: string;
}

export const adasCapabilities: AdasCapability[] = [
  {
    name: "Automated parking",
    detail:
      "Three parking scenarios — parallel-backward, perpendicular-forward, and perpendicular-backward — each generating a circle–line–circle trajectory parameterised by the vehicle's own geometry (50 × 35 cm body, 5 cm safety margin) and its minimum turning radius at full steering lock.",
    icon: "ParkingSquare",
  },
  {
    name: "Parking-slot detection",
    detail:
      "The car drives past a row of obstacles, accumulates ultrasonic returns into a scanned-area profile, and accepts a gap once it exceeds a threshold derived from vehicle length (1.5× for a parallel slot).",
    icon: "ScanSearch",
  },
  {
    name: "Sensor-fused odometry",
    detail:
      "Pose is dead-reckoned from wheel travel and heading, where heading itself can be sourced from the MPU6050 gyro, the HMC5883L magnetometer, a fusion of the two, or arc geometry — four independent estimators that can be compared live against each other.",
    icon: "Compass",
  },
  {
    name: "Closed-loop path tracking",
    detail:
      "The tracker repeatedly samples the next waypoint from the planned path function, computes range and slope to it from the current pose, and corrects steering — with an open-loop variant kept alongside it as a control baseline.",
    icon: "Route",
  },
  {
    name: "Collision avoidance & emergency braking",
    detail:
      "Zoned ultrasonic coverage (forward, forward-left/right, lateral, rear) feeds a graded threat level that escalates to forced braking, with a driver warning stage before intervention.",
    icon: "ShieldAlert",
  },
  {
    name: "Personal parking — learn by demonstration",
    detail:
      "Drive the manoeuvre once and the car records its own control states into a 500-entry ring buffer on a periodic timer, persists it to EEPROM, and can replay the sequence — forwards to repeat it, or reversed to retrace its way back out.",
    icon: "History",
  },
];

export const adasChallenges = [
  {
    challenge:
      "Two teams — vision and embedded — had to build in parallel against hardware that did not exist yet, in a language with no interfaces.",
    solution:
      "Defined the whole boundary as pure C headers of function-pointer structs (IO_Modules) before either side started. Perception depends only on `MLLayer`; control depends only on `CarControl` and `CarMeasurements`. Either half could be stubbed, swapped, or tested standalone, and integration became a link step rather than a rewrite.",
  },
  {
    challenge:
      "Ultrasonic echoes are noisy, sensitive to surface angle, and a single bad reading can trigger a phantom brake.",
    solution:
      "Made uncertainty part of the type system: the filter returns a reading paired with a confidence value, so no consumer can silently treat a low-confidence echo as ground truth. Sensors also carry their chassis offsets and are sampled with current speed and encoder value, so returns can be placed correctly rather than assumed static.",
  },
  {
    challenge:
      "A gyro-only heading drifts over a long manoeuvre; a magnetometer alone is thrown off by the car's own motors.",
    solution:
      "Built four selectable yaw estimators — gyro, magnetometer, fusion, and arc geometry — behind one `Get_Yaw(source)` call, and shipped both compass and IMU yaw in every telemetry frame so the two could be compared live during a run instead of debugged after it.",
  },
  {
    challenge:
      "Parking paths generated as arbitrary splines are expensive to evaluate on a microcontroller with no OS and a tight control loop.",
    solution:
      "Used circle–line–circle geometry, where the path reduces to a closed-form function of x parameterised by turning radius and endpoint. The tracker samples it point-by-point at run time — no trajectory buffer, no solver, and the second circle's radius is pinned to the car's true minimum turning radius so a generated path is always physically drivable.",
  },
  {
    challenge:
      "Bare-metal firmware with no RTOS still has to keep control deterministic while streaming telemetry and driving an LCD.",
    solution:
      "Kept a strict layering discipline (LIB → MCAL → HAL → APP) so timing-critical code never reaches across layers, drove periodic work from hardware timers and SysTick rather than delay loops, and armed the independent watchdog so a stall in any feature resets the vehicle rather than leaving it under power with no controller.",
  },
];

export const adasResults = [
  "Grade A+ — ranked 5th of approximately 60 graduation projects in the Value competition",
  "Mentored by Valeo and sponsored by ITIDA's Egypt Makes Electronics (EME) programme",
  "Roughly 800 KB of hand-written C across five repositories, with zero vendor HAL dependencies",
  "Complete bare-metal driver suite: GPIO, EXTI, I2C, SPI, USART, TIMER, SysTick, NVIC, RCC, watchdog and FPU",
  "Six driving features shipped end to end, from ultrasonic echo through to motor and servo actuation",
  "Live wireless telemetry and surroundings mapping from a self-hosted access point on the vehicle",
];
