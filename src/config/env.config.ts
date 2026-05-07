export const ENV_KEYS = {
  API_BASE_URL: "VITE_API_BASE_URL",
  APP_ENV: "VITE_APP_ENV",
  MAINTENANCE_MODE: "VITE_MAINTENANCE_MODE",
} as const;

export type EnvKey = (typeof ENV_KEYS)[keyof typeof ENV_KEYS];

function normalize(raw: string | undefined): string | undefined {
  if (raw === undefined || raw === "") {
    return undefined;
  }

  return raw;
}

const ENV_VALUES = {
  [ENV_KEYS.API_BASE_URL]: normalize(import.meta.env.VITE_API_BASE_URL),
  [ENV_KEYS.APP_ENV]: normalize(import.meta.env.VITE_APP_ENV),
  [ENV_KEYS.MAINTENANCE_MODE]: normalize(
    import.meta.env.VITE_MAINTENANCE_MODE,
  ),
} satisfies Record<EnvKey, string | undefined>;

function parseBool(raw: string | undefined): boolean {
  if (raw === undefined) {
    return false;
  }
  const v = raw.trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

export function getEnvValue(key: EnvKey): string | undefined {
  return ENV_VALUES[key];
}

export const env = {
  apiBaseUrl: getEnvValue(ENV_KEYS.API_BASE_URL) ?? "",
  appEnv: getEnvValue(ENV_KEYS.APP_ENV) ?? import.meta.env.MODE,
  maintenanceMode: parseBool(getEnvValue(ENV_KEYS.MAINTENANCE_MODE)),
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
  mode: import.meta.env.MODE,
  baseUrl: import.meta.env.BASE_URL,
} as const;
