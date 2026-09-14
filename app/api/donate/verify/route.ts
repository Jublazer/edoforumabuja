import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference, amount, email } = body || {};

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Payment reference is required." },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: "Paystack secret key is not configured." },
        { status: 500 }
      );
    }

    const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok || !verifyData?.status || verifyData?.data?.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          error: verifyData?.message || "Transaction verification failed.",
        },
        { status: 400 }
      );
    }

    const verifiedAmount = Number(verifyData?.data?.amount || 0) / 100;
    const expectedAmount = Number(amount || 0);

    if (expectedAmount > 0 && verifiedAmount < expectedAmount) {
      return NextResponse.json(
        {
          success: false,
          error: "Verified payment amount does not match the donation amount.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Donation verified successfully.",
      data: {
        reference,
        amount: verifiedAmount,
        email: email || verifyData?.data?.customer?.email,
      },
    });
  } catch (error) {
    console.error("Paystack verification error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to verify payment at the moment." },
      { status: 500 }
    );
  }
}
