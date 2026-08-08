"use client";

import { motion } from "framer-motion";

/**
 * The eight-sensor ultrasonic ring, laid out to match the sensor map documented
 * in V2ADAS/Embeddedians `APP/Inc/Collision_Avoidance.h` and the telemetry frame
 * in `APP/Inc/App_Connection.h`.
 */
const SENSORS = [
  { id: "F", label: "Front", x: 120, y: 26, angle: 0 },
  { id: "FL", label: "Front left", x: 58, y: 58, angle: -45 },
  { id: "FR", label: "Front right", x: 182, y: 58, angle: 45 },
  { id: "LC", label: "Left centre", x: 40, y: 180, angle: -90 },
  { id: "RC", label: "Right centre", x: 200, y: 180, angle: 90 },
  { id: "BL", label: "Rear left", x: 58, y: 302, angle: -135 },
  { id: "BR", label: "Rear right", x: 182, y: 302, angle: 135 },
  { id: "B", label: "Rear", x: 120, y: 334, angle: 180 },
];

export function AdasSensorRing() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <div className="shrink-0">
          <svg
            viewBox="0 0 240 360"
            className="w-52 h-auto"
            role="img"
            aria-labelledby="sensor-ring-title sensor-ring-desc"
          >
            <title id="sensor-ring-title">
              Ultrasonic sensor layout on the ADAS vehicle
            </title>
            <desc id="sensor-ring-desc">
              A top-down view of the vehicle showing eight ultrasonic sensors: one at the
              front centre, one at the rear centre, two on the front corners, two on the
              rear corners, and one on each side at the centre line.
            </desc>

            {/* detection cones */}
            {SENSORS.map((s, i) => (
              <motion.g
                key={`cone-${s.id}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
              >
                <path
                  d="M 0 0 L -26 -46 A 53 53 0 0 1 26 -46 Z"
                  transform={`translate(${s.x} ${s.y}) rotate(${s.angle + 180})`}
                  fill="var(--brand-violet)"
                  opacity={0.13}
                />
              </motion.g>
            ))}

            {/* chassis */}
            <motion.rect
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ transformOrigin: "center" }}
              x="62"
              y="46"
              width="116"
              height="268"
              rx="26"
              fill="var(--card)"
              stroke="var(--brand-violet)"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            {/* windscreen + rear window, purely to orient the viewer */}
            <rect x="80" y="92" width="80" height="46" rx="12" fill="var(--brand-violet)" opacity="0.14" />
            <rect x="80" y="228" width="80" height="40" rx="12" fill="var(--brand-violet)" opacity="0.1" />
            <line x1="120" y1="150" x2="120" y2="212" stroke="var(--brand-pink)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 4" />

            {/* sensors */}
            {SENSORS.map((s, i) => (
              <motion.circle
                key={s.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.06 }}
                style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                cx={s.x}
                cy={s.y}
                r="7"
                fill="var(--brand-pink)"
              >
                <title>{`${s.label} ultrasonic sensor`}</title>
              </motion.circle>
            ))}
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">Eight-sensor ultrasonic ring</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Front, rear, both front corners, both rear corners, and both flanks — the
            coverage pattern that makes parallel-slot detection and zoned collision
            avoidance possible. Every reading ships in a single telemetry frame alongside
            total distance travelled and both heading estimates.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {SENSORS.map((s) => (
              <li key={s.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-brand-pink shrink-0" />
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const LAYERS = [
  {
    name: "APP",
    subtitle: "Driving features",
    items: [
      "Auto parking",
      "Personal parking",
      "Collision avoidance",
      "Path tracking",
      "Motion planning",
      "Odometry",
      "Reverse assist",
      "Scenario select",
    ],
    accent: "var(--brand-pink)",
  },
  {
    name: "HAL",
    subtitle: "Device drivers",
    items: ["Ultrasonic", "Servo", "DC motors", "LCD", "Compass", "MPU6050 IMU", "EEPROM"],
    accent: "var(--brand-violet)",
  },
  {
    name: "MCAL",
    subtitle: "Register-level microcontroller drivers",
    items: [
      "GPIO",
      "EXTI",
      "I2C",
      "SPI",
      "USART",
      "TIMER",
      "SysTick",
      "NVIC",
      "RCC",
      "Watchdog",
      "FPU",
    ],
    accent: "var(--brand-orange)",
  },
  {
    name: "LIB",
    subtitle: "Typed primitives & bit math",
    items: ["STD_TYPES", "BIT_MATH"],
    accent: "var(--muted-foreground)",
  },
];

export function AdasLayerStack() {
  return (
    <div className="space-y-3">
      {LAYERS.map((layer, idx) => (
        <motion.div
          key={layer.name}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6"
          style={{ borderLeftWidth: 3, borderLeftColor: layer.accent }}
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className="font-mono text-sm font-semibold tracking-wide"
              style={{ color: layer.accent }}
            >
              {layer.name}
            </span>
            <span className="text-xs text-muted-foreground">{layer.subtitle}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {layer.items.map((item) => (
              <span
                key={item}
                className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[0.7rem] text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
      <p className="text-xs text-muted-foreground pt-1">
        Each layer may only call the one beneath it — the discipline that kept timing-critical
        control code isolated from feature logic on a microcontroller with no operating system.
      </p>
    </div>
  );
}
