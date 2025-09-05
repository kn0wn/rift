import React from "react";

const CalendarTodosSection2 = () => {
  return (
    <div
      style={{
        marginBottom: "192px",
        userSelect: "none",
        cursor: "default",
        gap: "32px",
        flexDirection: "column",
        display: "flex",
        boxSizing: "border-box",
        borderWidth: "0px",
        borderStyle: "solid",
        borderColor: "rgb(205, 205, 205)",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          userSelect: "none",
          cursor: "default",
          gap: "8px",
          flexDirection: "column",
          width: "100%",
          display: "flex",
          marginBottom: "-16px",
          boxSizing: "border-box",
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(205, 205, 205)",
        }}
      >
        <span
          style={{
            userSelect: "none",
            cursor: "default",
            transitionProperty: "opacity",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "0.15s",
            color: "rgb(254, 102, 0)",
            fontWeight: 600,
            gap: "6px",
            alignItems: "center",
            display: "flex",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          Calendar &amp; Todos
        </span>
        <h4
          style={{
            fontSize: "40px",
            lineHeight: "54.4px",
            letterSpacing: "-0.5px",
            userSelect: "none",
            cursor: "default",
            fontWeight: 700,
            margin: "0px",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          Organize your day on autopilot
        </h4>
      </div>

      {/* Replaces Section */}
      <div
        style={{
          userSelect: "none",
          cursor: "default",
          gap: "8px",
          alignItems: "center",
          display: "flex",
          boxSizing: "border-box",
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(205, 205, 205)",
        }}
      >
        <span
          style={{
            userSelect: "none",
            cursor: "default",
            fontWeight: 500,
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          Replaces:
        </span>
        <div
          style={{
            userSelect: "none",
            cursor: "default",
            gap: "6px",
            display: "flex",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              gap: "4px",
              alignItems: "center",
              display: "flex",
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
                borderRadius: "4px",
                backgroundColor: "rgb(92, 92, 92)",
                opacity: "0.8",
                userSelect: "none",
              }}
            />
            <span
              style={{
                userSelect: "none",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              Gcal
            </span>
          </div>
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              gap: "4px",
              alignItems: "center",
              display: "flex",
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
                borderRadius: "4px",
                backgroundColor: "rgb(92, 92, 92)",
                opacity: "0.8",
                userSelect: "none",
              }}
            />
            <span
              style={{
                userSelect: "none",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              Things 3
            </span>
          </div>
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              gap: "4px",
              alignItems: "center",
              display: "flex",
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
                borderRadius: "4px",
                backgroundColor: "rgb(92, 92, 92)",
                opacity: "0.8",
                userSelect: "none",
              }}
            />
            <span
              style={{
                userSelect: "none",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              Motion
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          marginBottom: "0px",
          userSelect: "text",
          cursor: "default",
          color: "rgb(92, 92, 92)",
          textWrap: "pretty",
          boxSizing: "border-box",
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(205, 205, 205)",
        }}
      >
        Combine action items from your calls with todos from eg Notion or
        Todoist in one place. From there, we use AI to schedule your day.
        Whenever your plans change, we shuffle around your schedule to keep you
        on track.
      </p>

      {/* Feature Grid */}
      <div
        style={{
          gridTemplateColumns: "463.992px 463.992px",
          userSelect: "none",
          cursor: "default",
          gap: "48px",
          display: "grid",
          marginBottom: "24px",
          boxSizing: "border-box",
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(205, 205, 205)",
        }}
      >
        <div
          style={{
            userSelect: "none",
            cursor: "default",
            gap: "32px",
            flexDirection: "column",
            display: "flex",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              gap: "8px",
              flexDirection: "column",
              width: "100%",
              display: "flex",
              marginTop: "16px",
              marginBottom: "-24px",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <h4
              style={{
                userSelect: "none",
                cursor: "default",
                letterSpacing: "-0.5px",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "28px",
                margin: "0px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              AI Scheduling
            </h4>
          </div>
          <p
            style={{
              marginBottom: "0px",
              userSelect: "text",
              cursor: "default",
              color: "rgb(92, 92, 92)",
              textWrap: "pretty",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            We&apos;ll put together your schedule on automatically. You&apos;ll
            keep app deadlines, and will work on the highest priority items
            first.
          </p>
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              flexDirection: "column",
              width: "100%",
              display: "flex",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "126.984px",
                backgroundColor: "rgb(245, 245, 245)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
                color: "rgb(92, 92, 92)",
                fontSize: "14px",
              }}
            >
              AI Scheduling Preview
            </div>
          </div>
        </div>

        <div
          style={{
            userSelect: "none",
            cursor: "default",
            gap: "32px",
            flexDirection: "column",
            display: "flex",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              gap: "8px",
              flexDirection: "column",
              width: "100%",
              display: "flex",
              marginTop: "16px",
              marginBottom: "-24px",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <h4
              style={{
                userSelect: "none",
                cursor: "default",
                letterSpacing: "-0.5px",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "28px",
                margin: "0px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              AI Calendar
            </h4>
          </div>
          <p
            style={{
              marginBottom: "0px",
              userSelect: "text",
              cursor: "default",
              color: "rgb(92, 92, 92)",
              textWrap: "pretty",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            Ask the chat to create or update your events. Ask it how much time
            you&apos;ve spent on demo calls last week. Or have it prepare
            today&apos;s agendas.
          </p>
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              flexDirection: "column",
              width: "100%",
              display: "flex",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "126.984px",
                backgroundColor: "rgb(245, 245, 245)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
                color: "rgb(92, 92, 92)",
                fontSize: "14px",
              }}
            >
              AI Calendar Preview
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          userSelect: "none",
          cursor: "default",
          backgroundColor: "rgba(235, 235, 235, 0.5)",
          width: "100%",
          height: "0.984375px",
          marginTop: "16px",
          marginBottom: "16px",
          boxSizing: "border-box",
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(205, 205, 205)",
        }}
      ></div>

      {/* Testimonials Grid */}
      <div
        style={{
          gridTemplateColumns: "298.664px 298.664px 298.664px",
          userSelect: "none",
          cursor: "default",
          gap: "40px",
          display: "grid",
          marginTop: "8px",
          marginBottom: "-24px",
          boxSizing: "border-box",
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(205, 205, 205)",
        }}
      >
        {/* Testimonial 1 - Oz */}
        <div
          style={{
            userSelect: "none",
            cursor: "default",
            width: "100%",
            height: "116.977px",
            display: "flex",
            position: "relative",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              top: "0px",
              right: "6px",
              position: "absolute",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: "rgb(0, 0, 0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              <span
                style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}
              >
                X
              </span>
            </div>
          </div>
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              paddingTop: "3px",
              flexDirection: "column",
              display: "flex",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "4px",
                alignItems: "center",
                display: "flex",
                marginBottom: "20px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              {/* 5 Star Rating */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                >
                  <path
                    fill="#FF9D00"
                    d="M10.433 1.647c-.577-1.196-2.289-1.196-2.865 0L6.056 4.783a.088.088 0 0 1-.068.048l-3.48.454C1.192 5.457.643 7.079 1.624 8l2.545 2.392c.02.02.028.045.024.069l-.64 3.417c-.247 1.323 1.159 2.302 2.318 1.68L8.955 13.9a.096.096 0 0 1 .09 0l3.085 1.657c1.159.623 2.564-.356 2.317-1.68l-.64-3.416a.076.076 0 0 1 .024-.07l2.546-2.391c.98-.922.431-2.544-.885-2.716l-3.479-.454a.088.088 0 0 1-.069-.048l-1.511-3.136Z"
                  />
                </svg>
              ))}
            </div>
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "8px",
                alignItems: "center",
                display: "flex",
                marginBottom: "8px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  backgroundColor: "rgb(205, 205, 205)",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  flexShrink: 0,
                  width: "1.25rem",
                  height: "19.9922px",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "19.9922px",
                    backgroundColor: "rgb(156, 163, 175)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    userSelect: "none",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  O
                </div>
              </div>
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  gap: "2px",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Oz
                </span>
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    color: "rgb(92, 92, 92)",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Founder
                </span>
              </div>
            </div>
            <span
              style={{
                userSelect: "none",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                lineHeight: "24px",
                textWrap: "balance",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              It doesn&apos;t have to suck to be productive, Amie reminds you of
              that
            </span>
          </div>
        </div>

        {/* Testimonial 2 - Raf */}
        <div
          style={{
            userSelect: "none",
            cursor: "default",
            width: "100%",
            height: "140.977px",
            display: "flex",
            position: "relative",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              top: "0px",
              right: "6px",
              position: "absolute",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: "rgb(0, 0, 0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              <span
                style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}
              >
                X
              </span>
            </div>
          </div>
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              paddingTop: "3px",
              flexDirection: "column",
              display: "flex",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "4px",
                alignItems: "center",
                display: "flex",
                marginBottom: "20px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              {/* 5 Star Rating */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                >
                  <path
                    fill="#FF9D00"
                    d="M10.433 1.647c-.577-1.196-2.289-1.196-2.865 0L6.056 4.783a.088.088 0 0 1-.068.048l-3.48.454C1.192 5.457.643 7.079 1.624 8l2.545 2.392c.02.02.028.045.024.069l-.64 3.417c-.247 1.323 1.159 2.302 2.318 1.68L8.955 13.9a.096.096 0 0 1 .09 0l3.085 1.657c1.159.623 2.564-.356 2.317-1.68l-.64-3.416a.076.076 0 0 1 .024-.07l2.546-2.391c.98-.922.431-2.544-.885-2.716l-3.479-.454a.088.088 0 0 1-.069-.048l-1.511-3.136Z"
                  />
                </svg>
              ))}
            </div>
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "8px",
                alignItems: "center",
                display: "flex",
                marginBottom: "8px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  backgroundColor: "rgb(205, 205, 205)",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  flexShrink: 0,
                  width: "1.25rem",
                  height: "19.9922px",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "19.9922px",
                    backgroundColor: "rgb(156, 163, 175)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    userSelect: "none",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  R
                </div>
              </div>
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  gap: "2px",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Raf
                </span>
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    color: "rgb(92, 92, 92)",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Designer
                </span>
              </div>
            </div>
            <span
              style={{
                userSelect: "none",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                lineHeight: "24px",
                textWrap: "balance",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              nothing but joy. opening a calendar shouldn&apos;t be stressful.
              can&apos;t imagine to go back
            </span>
          </div>
        </div>

        {/* Testimonial 3 - Noah */}
        <div
          style={{
            userSelect: "none",
            cursor: "default",
            width: "100%",
            height: "116.977px",
            display: "flex",
            position: "relative",
            boxSizing: "border-box",
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(205, 205, 205)",
          }}
        >
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              top: "0px",
              right: "6px",
              position: "absolute",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                backgroundColor: "rgb(0, 0, 0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
              }}
            >
              <span
                style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}
              >
                X
              </span>
            </div>
          </div>
          <div
            style={{
              userSelect: "none",
              cursor: "default",
              paddingTop: "3px",
              flexDirection: "column",
              display: "flex",
              boxSizing: "border-box",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(205, 205, 205)",
            }}
          >
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "4px",
                alignItems: "center",
                display: "flex",
                marginBottom: "20px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              {/* 5 Star Rating */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                >
                  <path
                    fill="#FF9D00"
                    d="M10.433 1.647c-.577-1.196-2.289-1.196-2.865 0L6.056 4.783a.088.088 0 0 1-.068.048l-3.48.454C1.192 5.457.643 7.079 1.624 8l2.545 2.392c.02.02.028.045.024.069l-.64 3.417c-.247 1.323 1.159 2.302 2.318 1.68L8.955 13.9a.096.096 0 0 1 .09 0l3.085 1.657c1.159.623 2.564-.356 2.317-1.68l-.64-3.416a.076.076 0 0 1 .024-.07l2.546-2.391c.98-.922.431-2.544-.885-2.716l-3.479-.454a.088.088 0 0 1-.069-.048l-1.511-3.136Z"
                  />
                </svg>
              ))}
            </div>
            <div
              style={{
                userSelect: "none",
                cursor: "default",
                gap: "8px",
                alignItems: "center",
                display: "flex",
                marginBottom: "8px",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  backgroundColor: "rgb(205, 205, 205)",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  flexShrink: 0,
                  width: "1.25rem",
                  height: "19.9922px",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "19.9922px",
                    backgroundColor: "rgb(156, 163, 175)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    userSelect: "none",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  N
                </div>
              </div>
              <div
                style={{
                  userSelect: "none",
                  cursor: "default",
                  gap: "2px",
                  display: "flex",
                  boxSizing: "border-box",
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(205, 205, 205)",
                }}
              >
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Noah
                </span>
                <span
                  style={{
                    userSelect: "none",
                    cursor: "default",
                    color: "rgb(92, 92, 92)",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    boxSizing: "border-box",
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(205, 205, 205)",
                  }}
                >
                  Founder
                </span>
              </div>
            </div>
            <span
              style={{
                userSelect: "none",
                cursor: "default",
                color: "rgb(92, 92, 92)",
                lineHeight: "24px",
                textWrap: "balance",
                boxSizing: "border-box",
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(205, 205, 205)",
              }}
            >
              I can finally do time blocking and to-do lists from one interface.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTodosSection2;
