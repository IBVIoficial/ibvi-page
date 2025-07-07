import { NextRequest, NextResponse } from "next/server";
import { sendServerEventMeta } from "@/lib/meta-pixel/meta-conversions-api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Obter o IP do cliente
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";

    // Adicionar o IP do cliente aos dados do usuário
    if (body.user_data && !body.user_data.client_ip_address) {
      body.user_data.client_ip_address = clientIp;
    }

    // Enviar evento para Meta Conversions API
    const result = await sendServerEventMeta(body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Event sent successfully",
        data: result.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          details: result.details,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in /api/event:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
