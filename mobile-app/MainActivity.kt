package com.nxtlevelgamingescape

import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat

// ============================================
// NXT LEVEL GAMING ESCAPE - Kotlin Android App
// XHAW5112 University Project
// Booking cart + discount logic (MO03)
// ============================================

class MainActivity : AppCompatActivity() {

    // ===== COLORS =====
    private val BG_DARK = 0xFF0B0B0B.toInt()
    private val GREEN_HEADER = 0xFF000000.toInt()
    private val GREEN_ACCENT = 0xFF2B2B2B.toInt()
    private val ORANGE_CTA = 0xFFFFFFFF.toInt()
    private val CYAN_NEON = 0xFFD9D9D9.toInt()
    private val CARD_BG = 0xFF171717.toInt()
    private val TEXT_WHITE = 0xFFFFFFFF.toInt()
    private val TEXT_GREY = 0xFFC4C4C4.toInt()

    // ===== PACKAGE DATA =====
    data class Package(
        val id: Int,
        val name: String,
        val price: Int,
        val desc: String
    )

    private val packages = listOf(
        Package(1, "Ultimate Gaming Day", 1500, "Full day LAN, PC + Console, VR, Tournaments + Snacks."),
        Package(2, "Family Game Night", 1500, "Co-op + Board Games, up to 6 players, pizza included."),
        Package(3, "VR Arena Adventure", 750, "Immersive VR, multiplayer, 60-min, all gear provided."),
        Package(4, "E-Sports Tournament Entry", 600, "Competitive play, prize pool, teams & solo welcome."),
        Package(5, "Streaming & Content Creation", 800, "Pro studio, overlay & mic, 2-hour streaming slot.")
    )

    // ===== CART STATE =====
    private val cart = mutableListOf<Package>()

    // ===== DISCOUNT RULE (MO03) =====
    // 1 booking = 0%, 2 = 5%, 3 = 10%, 4+ = 15%
    private fun getDiscountRate(count: Int): Double {
        return when {
            count >= 4 -> 0.15
            count == 3 -> 0.10
            count == 2 -> 0.05
            else -> 0.0
        }
    }

    private fun calculateQuote(): Quote {
        val count = cart.size
        val subtotal = cart.sumOf { it.price }
        val rate = getDiscountRate(count)
        val discountAmount = (subtotal * rate).toInt()
        val total = subtotal - discountAmount
        return Quote(count, subtotal, rate, discountAmount, total)
    }

    data class Quote(
        val count: Int,
        val subtotal: Int,
        val rate: Double,
        val discountAmount: Int,
        val total: Int
    )

    // ===== FORMAT CURRENCY =====
    private fun formatZAR(amount: Int): String {
        return "R %,d".format(amount)
    }

    // ===== LAYOUT VIEWS =====
    private lateinit var cartListContainer: LinearLayout
    private lateinit var quoteSubtotal: TextView
    private lateinit var quoteCount: TextView
    private lateinit var quoteDiscountRate: TextView
    private lateinit var quoteDiscountAmount: TextView
    private lateinit var quoteTotal: TextView
    private lateinit var packagesContainer: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        buildUI()
    }

    // ===== BUILD UI PROGRAMMATICALLY =====
    private fun buildUI() {
        val scrollView = ScrollView(this).apply {
            setBackgroundColor(BG_DARK)
        }
        val rootLayout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(BG_DARK)
            setPadding(0, 0, 0, 40)
        }

        // HEADER
        val header = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(GREEN_HEADER)
            setPadding(20, 30, 20, 30)
        }
        val headerTitle = TextView(this).apply {
            text = "NXT LEVEL"
            setTextColor(CYAN_NEON)
            textSize = 20f
            setPadding(0, 0, 0, 2)
            textAlignment = View.TEXT_ALIGNMENT_CENTER
        }
        val headerSub = TextView(this).apply {
            text = "GAMING ESCAPE"
            setTextColor(TEXT_WHITE)
            textSize = 11f
            letterSpacing = 0.3f
            textAlignment = View.TEXT_ALIGNMENT_CENTER
        }
        header.addView(headerTitle)
        header.addView(headerSub)
        rootLayout.addView(header)

        // HERO
        val heroTitle = TextView(this).apply {
            text = "Enter the Game.\nEscape Reality."
            setTextColor(TEXT_WHITE)
            textSize = 24f
            setPadding(30, 30, 30, 10)
            textAlignment = View.TEXT_ALIGNMENT_CENTER
        }
        val heroSubtitle = TextView(this).apply {
            text = "South Africa's premier esports arena, VR lounge, and gaming destination."
            setTextColor(TEXT_GREY)
            textSize = 13f
            setPadding(30, 0, 30, 30)
            textAlignment = View.TEXT_ALIGNMENT_CENTER
        }
        rootLayout.addView(heroTitle)
        rootLayout.addView(heroSubtitle)

        // SECTION TITLE
        val sectionTitle = TextView(this).apply {
            text = "GAMING PACKAGES"
            setTextColor(TEXT_WHITE)
            textSize = 18f
            setPadding(30, 20, 30, 16)
        }
        rootLayout.addView(sectionTitle)

        // PACKAGES CONTAINER
        packagesContainer = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(30, 0, 30, 20)
        }
        packages.forEach { pkg ->
            packagesContainer.addView(createPackageCard(pkg))
        }
        rootLayout.addView(packagesContainer)

        // QUOTATION BOX
        val quoteBox = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(CARD_BG)
            setPadding(30, 30, 30, 30)
            setMargins(30, 20, 30, 20)
        }
        val quoteBoxInner = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(CARD_BG)
            setPadding(40, 40, 40, 40)
        }
        // Apply cyan border via background
        val borderDrawable = android.graphics.drawable.GradientDrawable().apply {
            setStroke(4, CYAN_NEON)
            cornerRadius = 24f
            setColor(CARD_BG)
        }
        quoteBoxInner.background = borderDrawable

        val quoteTitle = TextView(this).apply {
            text = "QUOTATION SUMMARY"
            setTextColor(CYAN_NEON)
            textSize = 14f
            textAlignment = View.TEXT_ALIGNMENT_CENTER
            setPadding(0, 0, 0, 20)
        }
        quoteBoxInner.addView(quoteTitle)

        quoteSubtotal = TextView(this).apply { setTextColor(TEXT_WHITE); textSize = 14f }
        quoteCount = TextView(this).apply { setTextColor(TEXT_WHITE); textSize = 14f }
        quoteDiscountRate = TextView(this).apply { setTextColor(TEXT_WHITE); textSize = 14f }
        quoteDiscountAmount = TextView(this).apply { setTextColor(0xFFFF6B6B.toInt()); textSize = 14f }
        quoteTotal = TextView(this).apply { setTextColor(CYAN_NEON); textSize = 28f; setPadding(0, 10, 0, 10) }

        quoteBoxInner.addView(createQuoteRow("Subtotal", quoteSubtotal))
        quoteBoxInner.addView(createQuoteRow("Bookings Count", quoteCount))
        quoteBoxInner.addView(createQuoteRow("Discount Rate", quoteDiscountRate))
        quoteBoxInner.addView(createQuoteRow("Discount Amount", quoteDiscountAmount))

        val divider = View(this).apply {
            setBackgroundColor(0x3300FFC2)
            setLayoutParams(LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 1).apply {
                topMargin = 20; bottomMargin = 20
            })
        }
        quoteBoxInner.addView(divider)

        val totalRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(0, 10, 0, 10)
        }
        val totalLabel = TextView(this).apply {
            text = "TOTAL QUOTE"
            setTextColor(TEXT_WHITE)
            textSize = 15f
            layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
        }
        quoteTotal.layoutParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT
        )
        totalRow.addView(totalLabel)
        totalRow.addView(quoteTotal)
        quoteBoxInner.addView(totalRow)

        val ruleText = TextView(this).apply {
            text = "Discount Rule:\n1 = 0% · 2 = 5% · 3 = 10% · 4+ = 15%"
            setTextColor(TEXT_GREY)
            textSize = 11f
            textAlignment = View.TEXT_ALIGNMENT_CENTER
            setPadding(20, 30, 20, 20)
        }
        quoteBoxInner.addView(ruleText)

        val requestBtn = Button(this).apply {
            text = "REQUEST BOOKING"
            setBackgroundColor(ORANGE_CTA)
            setTextColor(BG_DARK)
            textSize = 14f
            setOnClickListener { requestBooking() }
        }
        quoteBoxInner.addView(requestBtn)

        quoteBox.addView(quoteBoxInner)
        rootLayout.addView(quoteBox)

        scrollView.addView(rootLayout)
        setContentView(scrollView)
    }

    private fun createQuoteRow(label: String, valueView: TextView): LinearLayout {
        val row = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(0, 8, 0, 8)
        }
        val labelTv = TextView(this).apply {
            text = label
            setTextColor(TEXT_GREY)
            textSize = 13f
            layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
        }
        valueView.layoutParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT
        )
        row.addView(labelTv)
        row.addView(valueView)
        return row
    }

    private fun createPackageCard(pkg: Package): LinearLayout {
        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(CARD_BG)
            setPadding(30, 30, 30, 30)
            setMargins(0, 0, 0, 20)
        }
        val borderDrawable = android.graphics.drawable.GradientDrawable().apply {
            setStroke(4, CYAN_NEON)
            cornerRadius = 20f
            setColor(CARD_BG)
        }
        card.background = borderDrawable

        // Top row: name + price badge
        val topRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(0, 0, 0, 8)
        }
        val nameTv = TextView(this).apply {
            text = pkg.name
            setTextColor(TEXT_WHITE)
            textSize = 16f
            setTypeface(typeface, android.graphics.Typeface.BOLD)
            layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
        }
        val priceTv = TextView(this).apply {
            text = formatZAR(pkg.price)
            setTextColor(BG_DARK)
            textSize = 13f
            setTypeface(typeface, android.graphics.Typeface.BOLD)
            setBackgroundColor(ORANGE_CTA)
            setPadding(16, 8, 16, 8)
        }
        topRow.addView(nameTv)
        topRow.addView(priceTv)
        card.addView(topRow)

        // Description
        val descTv = TextView(this).apply {
            text = pkg.desc
            setTextColor(TEXT_GREY)
            textSize = 12f
            setPadding(0, 6, 0, 16)
        }
        card.addView(descTv)

        // Add button
        val addBtn = Button(this).apply {
            text = if (isInCart(pkg.id)) "ADDED \u2713" else "+ ADD TO BOOKING"
            setBackgroundColor(if (isInCart(pkg.id)) GREEN_ACCENT else ORANGE_CTA)
            setTextColor(if (isInCart(pkg.id)) TEXT_WHITE else BG_DARK)
            textSize = 13f
            tag = pkg.id
            setOnClickListener {
                val p = packages.find { it.id == tag as Int }
                if (p != null) addToBooking(p)
            }
        }
        card.addView(addBtn)

        return card
    }

    // ===== CART OPERATIONS =====
    private fun isInCart(id: Int): Boolean = cart.any { it.id == id }

    private fun addToBooking(pkg: Package) {
        if (isInCart(pkg.id)) return
        cart.add(pkg)
        rebuildPackageCards()
        updateQuote()
    }

    private fun removeFromBooking(id: Int) {
        cart.removeAll { it.id == id }
        rebuildPackageCards()
        updateQuote()
    }

    private fun rebuildPackageCards() {
        packagesContainer.removeAllViews()
        packages.forEach { pkg ->
            packagesContainer.addView(createPackageCard(pkg))
        }
    }

    private fun updateQuote() {
        val q = calculateQuote()
        quoteSubtotal.text = formatZAR(q.subtotal)
        quoteCount.text = q.count.toString()
        quoteDiscountRate.text = "${(q.rate * 100).toInt()}%"
        quoteDiscountAmount.text = "-${formatZAR(q.discountAmount)}"
        quoteTotal.text = formatZAR(q.total)
    }

    private fun requestBooking() {
        if (cart.isEmpty()) {
            Toast.makeText(this, "Please add at least one package first.", Toast.LENGTH_SHORT).show()
            return
        }
        val q = calculateQuote()
        Toast.makeText(
            this,
            "Booking confirmed! ${q.count} package(s) - Total: ${formatZAR(q.total)} (Saved ${formatZAR(q.discountAmount)})",
            Toast.LENGTH_LONG
        ).show()
    }
}
