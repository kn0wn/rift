"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import {
  Users,
  CreditCard,
  Home,
  DollarSign,
  ReceiptText,
  Key,
  MessageSquare,
  Bot,
  Lightbulb,
  Palette,
  Target,
  Bell,
  Mail,
  LogOut,
} from "lucide-react";

interface SettingsNavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SettingsSection {
  title: string;
  items: SettingsNavItem[];
}

const settingsSections: SettingsSection[] = [
  {
    title: "Organization Settings",
    items: [
      {
        title: "Overview",
        href: "/settings",
        icon: Home,
      },
      {
        title: "Members",
        href: "/settings/members",
        icon: Users,
      },
      {
        title: "Billing",
        href: "/settings/billing",
        icon: DollarSign,
      },
      {
        title: "Plans",
        href: "/settings/plans",
        icon: ReceiptText,
      },
    ],
  },
  {
    title: "Personal Settings",
    items: [
      {
        title: "Profile",
        href: "/settings/profile",
        icon: Users,
      },
      {
        title: "API Keys",
        href: "/settings/api-keys",
        icon: Key,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Responses",
        href: "/settings/responses",
        icon: MessageSquare,
      },
      {
        title: "Models",
        href: "/settings/models",
        icon: Bot,
      },
      {
        title: "Tips",
        href: "/settings/tips",
        icon: Lightbulb,
      },
      {
        title: "Appearance",
        href: "/settings/appearance",
        icon: Palette,
      },
      {
        title: "Shortcuts",
        href: "/settings/shortcuts",
        icon: Target,
      },
    ],
  },
];

const footerItems: SettingsNavItem[] = [
  {
    title: "Updates",
    href: "/settings/updates",
    icon: Bell,
  },
  {
    title: "Contact us",
    href: "/settings/contact-us",
    icon: Mail,
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getHoverStyle = (isActive: boolean) => ({
    ":hover": {
      backgroundColor: isActive ? "rgb(220, 220, 220)" : "rgb(235, 235, 235)",
    },
  });

  return (
    <div
      style={{
        flexBasis: "320px",
        scrollbarWidth: "none",
        userSelect: "none",
        cursor: "default",
        transitionProperty:
          "color, background-color, border-color, text-decoration-color, fill, stroke",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "0.15s",
        paddingLeft: "24px",
        paddingRight: "24px",
        backgroundColor: "rgb(242, 242, 242)",
        overflowY: "scroll",
        height: "100vh",
        boxSizing: "border-box",
        borderWidth: "0px",
        borderStyle: "solid",
        borderColor: "rgb(205, 205, 205)",
      }}
    >
      <nav
        aria-label="Main"
        data-orientation="vertical"
        dir="ltr"
        style={{
          appRegion: "no-drag",
          cursor: "pointer",
          userSelect: "none",
          paddingTop: "48px",
          paddingBottom: "48px",
          flexDirection: "column",
          width: "12rem",
          display: "flex",
          marginLeft: "auto",
          boxSizing: "border-box",
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(205, 205, 205)",
        }}
      >
        <div
          style={{
            position: "relative",
            appRegion: "no-drag",
            cursor: "pointer",
            userSelect: "none",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          <ul
            data-orientation="vertical"
            dir="ltr"
            style={{
              appRegion: "no-drag",
              cursor: "pointer",
              userSelect: "none",
              flexDirection: "column",
              display: "flex",
              marginTop: "-6px",
              listStyle: "outside none none",
              margin: "-6px 0px 0px",
              padding: "0px",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            {/* Organization Header Button */}
            <button
              type="button"
              style={{
                appRegion: "no-drag",
                cursor: "pointer",
                fontWeight: "530",
                textAlign: "left",
                userSelect: "none",
                fontVariationSettings: "'wght' 530",
                transitionProperty:
                  "color, background-color, border-color, text-decoration-color, fill, stroke",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "0.15s",
                fontSize: "14px",
                lineHeight: "20px",
                paddingTop: "6px",
                paddingBottom: "6px",
                paddingLeft: "8px",
                paddingRight: "8px",
                borderRadius: "8px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                gap: "8px",
                alignItems: "center",
                appearance: "none",
                display: "flex",
                marginTop: "2px",
                marginBottom: "2px",
                position: "relative",
                backgroundColor: "rgba(0, 0, 0, 0)",
                backgroundImage: "none",
                textTransform: "none",
                fontFamily:
                  "'Inter var', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                fontFeatureSettings: "'ss01', 'calt', 'case'",
                letterSpacing: "-0.003px",
                color: "rgb(23, 23, 23)",
                margin: "2px 0px",
                padding: "6px 8px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(230, 230, 230)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0)";
              }}
            >
              <div
                style={{
                  appRegion: "no-drag",
                  cursor: "pointer",
                  userSelect: "none",
                  color: "rgb(23, 23, 23)",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    appRegion: "no-drag",
                    cursor: "pointer",
                    userSelect: "none",
                    borderRadius: "12px",
                    overflow: "hidden",
                    flexShrink: "0",
                    position: "relative",
                    pointerEvents: "none",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      appRegion: "no-drag",
                      cursor: "pointer",
                      userSelect: "none",
                      flexShrink: "0",
                      pointerEvents: "none",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <div
                      style={{
                        appRegion: "no-drag",
                        cursor: "pointer",
                        userSelect: "none",
                        color: "rgb(250, 250, 250)",
                        backgroundImage:
                          "linear-gradient(to top, rgb(160, 160, 160), rgb(190, 190, 190))",
                        backgroundColor: "rgb(190, 190, 190)",
                        borderRadius: "9999px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "20px",
                        display: "flex",
                        position: "absolute",
                        inset: "0px",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          appRegion: "no-drag",
                          cursor: "pointer",
                          userSelect: "none",
                          fontVariationSettings: "'wght' 750",
                          fontWeight: "750",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      >
                        A
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <span
                style={{
                  appRegion: "no-drag",
                  cursor: "pointer",
                  userSelect: "none",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  gap: "4px",
                  alignItems: "center",
                  width: "fit-content",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                Arisay's Organization
              </span>
              <span
                style={{
                  appRegion: "no-drag",
                  cursor: "pointer",
                  userSelect: "none",
                  color: "rgb(145, 145, 145)",
                  marginLeft: "auto",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{
                    appRegion: "no-drag",
                    cursor: "pointer",
                    userSelect: "none",
                    display: "block",
                    verticalAlign: "middle",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.135 8.341 9.55a.5.5 0 0 1-.682 0L4 6.135"
                  />
                </svg>
              </span>
            </button>

            {/* Navigation Sections */}
            {settingsSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <span
                  style={{
                    appRegion: "no-drag",
                    cursor: "pointer",
                    userSelect: "none",
                    fontVariationSettings: "'wght' 600",
                    color: "rgb(115, 115, 115)",
                    fontWeight: "600",
                    fontSize: "12px",
                    lineHeight: "15.84px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    marginTop: "8px",
                    marginBottom: "6px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  {section.title}
                </span>

                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link key={item.href} href={item.href}>
                      <button
                        style={{
                          appRegion: "no-drag",
                          cursor: "pointer",
                          fontWeight: "530",
                          textAlign: "left",
                          userSelect: "none",
                          fontVariationSettings: "'wght' 530",
                          transitionProperty:
                            "color, background-color, border-color, text-decoration-color, fill, stroke",
                          transitionTimingFunction:
                            "cubic-bezier(0.4, 0, 0.2, 1)",
                          transitionDuration: "0.15s",
                          color: isActive
                            ? "rgb(23, 23, 23)"
                            : "rgb(115, 115, 115)",
                          fontSize: "14px",
                          lineHeight: "20px",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                          paddingLeft: "8px",
                          paddingRight: "8px",
                          backgroundColor: isActive
                            ? "rgb(220, 220, 220)"
                            : "rgba(0, 0, 0, 0)",
                          borderRadius: "8px",
                          alignItems: "center",
                          display: "flex",
                          marginTop: "2px",
                          marginBottom: "2px",
                          position: "relative",
                          appearance: "button",
                          backgroundImage: "none",
                          textTransform: "none",
                          fontFamily:
                            "'Inter var', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                          fontFeatureSettings: "'ss01', 'calt', 'case'",
                          letterSpacing: "-0.003px",
                          margin: "2px 0px",
                          padding: "6px 8px",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                          width: "100%",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor =
                              "rgb(235, 235, 235)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor =
                              "rgba(0, 0, 0, 0)";
                          }
                        }}
                      >
                        <div
                          style={{
                            appRegion: "no-drag",
                            cursor: "pointer",
                            userSelect: "none",
                            transitionProperty:
                              "color, background-color, border-color, text-decoration-color, fill, stroke",
                            transitionTimingFunction:
                              "cubic-bezier(0.4, 0, 0.2, 1)",
                            transitionDuration: "0.15s",
                            color: isActive
                              ? "rgb(92, 92, 92)"
                              : "rgb(145, 145, 145)",
                            width: "1.25rem",
                            height: "20px",
                            marginRight: "8px",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        >
                          <Icon
                            style={{
                              appRegion: "no-drag",
                              cursor: "pointer",
                              userSelect: "none",
                              width: "1.25rem",
                              height: "20px",
                              display: "block",
                              verticalAlign: "middle",
                              boxSizing: "border-box",
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(205, 205, 205)",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            appRegion: "no-drag",
                            cursor: "pointer",
                            userSelect: "none",
                            flex: "1 1 0%",
                            boxSizing: "border-box",
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(205, 205, 205)",
                          }}
                        >
                          {item.title}
                        </span>
                      </button>
                    </Link>
                  );
                })}

                {sectionIndex < settingsSections.length - 1 && (
                  <div
                    style={{
                      appRegion: "no-drag",
                      cursor: "pointer",
                      userSelect: "none",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      width: "100%",
                      marginTop: "10px",
                      marginBottom: "10px",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                    }}
                  >
                    <hr
                      style={{
                        appRegion: "no-drag",
                        cursor: "pointer",
                        userSelect: "none",
                        transitionProperty:
                          "color, background-color, border-color, text-decoration-color, fill, stroke",
                        transitionTimingFunction:
                          "cubic-bezier(0.4, 0, 0.2, 1)",
                        transitionDuration: "0.15s",
                        backgroundColor: "rgba(0, 0, 0, 0.06)",
                        borderWidth: "0px",
                        width: "100%",
                        height: "1px",
                        margin: "0px",
                        color: "rgb(23, 23, 23)",
                        borderTopWidth: "0px",
                        boxSizing: "border-box",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Divider */}
            <div
              style={{
                appRegion: "no-drag",
                cursor: "pointer",
                userSelect: "none",
                paddingLeft: "8px",
                paddingRight: "8px",
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <hr
                style={{
                  appRegion: "no-drag",
                  cursor: "pointer",
                  userSelect: "none",
                  transitionProperty:
                    "color, background-color, border-color, text-decoration-color, fill, stroke",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "0.15s",
                  backgroundColor: "rgba(0, 0, 0, 0.06)",
                  borderWidth: "0px",
                  width: "100%",
                  height: "1px",
                  margin: "0px",
                  color: "rgb(23, 23, 23)",
                  borderTopWidth: "0px",
                  boxSizing: "border-box",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              />
            </div>

            {/* Footer Items */}
            {footerItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <button
                    style={{
                      appRegion: "no-drag",
                      cursor: "pointer",
                      fontWeight: "530",
                      textAlign: "left",
                      userSelect: "none",
                      fontVariationSettings: "'wght' 530",
                      transitionProperty:
                        "color, background-color, border-color, text-decoration-color, fill, stroke",
                      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      transitionDuration: "0.15s",
                      color: isActive
                        ? "rgb(23, 23, 23)"
                        : "rgb(115, 115, 115)",
                      fontSize: "14px",
                      lineHeight: "20px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      backgroundColor: isActive
                        ? "rgb(220, 220, 220)"
                        : "rgba(0, 0, 0, 0)",
                      borderRadius: "8px",
                      alignItems: "center",
                      display: "flex",
                      marginTop: "2px",
                      marginBottom: "2px",
                      position: "relative",
                      appearance: "button",
                      backgroundImage: "none",
                      textTransform: "none",
                      fontFamily:
                        "'Inter var', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                      fontFeatureSettings: "'ss01', 'calt', 'case'",
                      letterSpacing: "-0.003px",
                      margin: "2px 0px",
                      padding: "6px 8px",
                      boxSizing: "border-box",
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(205, 205, 205)",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor =
                          "rgb(235, 235, 235)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(0, 0, 0, 0)";
                      }
                    }}
                  >
                    <div
                      style={{
                        appRegion: "no-drag",
                        cursor: "pointer",
                        userSelect: "none",
                        transitionProperty:
                          "color, background-color, border-color, text-decoration-color, fill, stroke",
                        transitionTimingFunction:
                          "cubic-bezier(0.4, 0, 0.2, 1)",
                        transitionDuration: "0.15s",
                        color: isActive
                          ? "rgb(92, 92, 92)"
                          : "rgb(145, 145, 145)",
                        width: "1.25rem",
                        height: "20px",
                        marginRight: "8px",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      <Icon
                        style={{
                          appRegion: "no-drag",
                          cursor: "pointer",
                          userSelect: "none",
                          width: "1.25rem",
                          height: "20px",
                          display: "block",
                          verticalAlign: "middle",
                          boxSizing: "border-box",
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(205, 205, 205)",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        appRegion: "no-drag",
                        cursor: "pointer",
                        userSelect: "none",
                        flex: "1 1 0%",
                        boxSizing: "border-box",
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(205, 205, 205)",
                      }}
                    >
                      {item.title}
                    </span>
                  </button>
                </Link>
              );
            })}

            {/* Final Divider */}
            <div
              style={{
                appRegion: "no-drag",
                cursor: "pointer",
                userSelect: "none",
                paddingLeft: "8px",
                paddingRight: "8px",
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <hr
                style={{
                  appRegion: "no-drag",
                  cursor: "pointer",
                  userSelect: "none",
                  transitionProperty:
                    "color, background-color, border-color, text-decoration-color, fill, stroke",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "0.15s",
                  backgroundColor: "rgba(0, 0, 0, 0.06)",
                  borderWidth: "0px",
                  width: "100%",
                  height: "1px",
                  margin: "0px",
                  color: "rgb(23, 23, 23)",
                  borderTopWidth: "0px",
                  boxSizing: "border-box",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                appRegion: "no-drag",
                cursor: "pointer",
                fontWeight: "530",
                textAlign: "left",
                userSelect: "none",
                fontVariationSettings: "'wght' 530",
                transitionProperty:
                  "color, background-color, border-color, text-decoration-color, fill, stroke",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDuration: "0.15s",
                color: "rgb(253, 43, 56)",
                fontSize: "14px",
                lineHeight: "20px",
                paddingTop: "6px",
                paddingBottom: "6px",
                paddingLeft: "8px",
                paddingRight: "8px",
                borderRadius: "8px",
                alignItems: "center",
                display: "flex",
                marginTop: "2px",
                marginBottom: "2px",
                position: "relative",
                appearance: "button",
                backgroundColor: "rgba(0, 0, 0, 0)",
                backgroundImage: "none",
                textTransform: "none",
                fontFamily:
                  "'Inter var', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                fontFeatureSettings: "'ss01', 'calt', 'case'",
                letterSpacing: "-0.003px",
                margin: "2px 0px",
                padding: "6px 8px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(254, 242, 242)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0)";
              }}
            >
              <div
                style={{
                  appRegion: "no-drag",
                  cursor: "pointer",
                  userSelect: "none",
                  transitionProperty:
                    "color, background-color, border-color, text-decoration-color, fill, stroke",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "0.15s",
                  color: "rgb(253, 85, 97)",
                  width: "1.25rem",
                  height: "20px",
                  marginRight: "8px",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <LogOut
                  style={{
                    appRegion: "no-drag",
                    cursor: "pointer",
                    userSelect: "none",
                    transform: "matrix(-1, 0, 0, -1, 0, 0)",
                    width: "1.25rem",
                    height: "20px",
                    display: "block",
                    verticalAlign: "middle",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                />
              </div>
              <span
                style={{
                  appRegion: "no-drag",
                  cursor: "pointer",
                  userSelect: "none",
                  flex: "1 1 0%",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                Log out
              </span>
            </button>
          </ul>
        </div>
      </nav>
    </div>
  );
}
