<script setup lang="ts">
import { onMounted } from 'vue'
import { Mail, Phone, MapPin, Globe } from 'lucide-vue-next'

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
                        setTimeout(() => el.classList.add('reveal-visible'), i * 100)
                    })
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.1 },
    )
    document.querySelectorAll('.reveal-group').forEach((el) => observer.observe(el))
})
</script>

<template>
    <!-- CINEMATIC HERO -->
    <section class="relative h-[75dvh] overflow-hidden">
        <img
            src="@/assets/images/sfxc-building.jpg"
            alt="SFXC Campus"
            class="absolute inset-0 w-full h-full object-cover"
        />
        <div
            class="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10 z-1"
        ></div>
        <div
            class="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-1"
        ></div>
        <div
            class="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-primary/25 to-transparent z-1"
        ></div>
        <!-- Content -->
        <div class="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
            <div class="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-16 pb-12 md:pb-16">
                <div class="hidden md:flex items-center gap-4 mb-6">
                    <div class="w-10 h-0.5 bg-primary"></div>
                    <span class="text-white/50 text-xs font-medium uppercase tracking-[0.3em]"
                        >St. Francis Xavier College</span
                    >
                </div>
                <h1
                    class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-4"
                    style="font-family: 'Times New Roman', Times, serif"
                >
                    Connect With Us
                </h1>
                <p class="text-base md:text-lg text-white/60 max-w-md leading-relaxed">
                    We're here to help. Reach out to us with any questions, concerns, or inquiries —
                    we'll get back to you as soon as possible.
                </p>
            </div>
        </div>
    </section>

    <!-- GOOGLE MAP -->
    <section id="map" class="py-12 bg-muted/20 scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <div class="rounded-2xl overflow-hidden border border-border shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7891.911751061956!2d125.9743272!3d8.5036654!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fdfcec0b3e6c19%3A0xb8c88f05389f18ef!2sSaint%20Francis%20Xavier%20College!5e0!3m2!1sen!2sph!4v1769919580174!5m2!1sen!2sph"
                    width="100%"
                    height="400"
                    style="border: 0"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    </section>

    <!-- CONTACT INFO + FORM -->
    <section id="contact" class="py-24 bg-background scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <!-- Section Header -->
            <div class="reveal-group mb-16">
                <div class="reveal-item flex items-center gap-3 mb-4">
                    <div class="w-8 h-0.5 bg-primary"></div>
                    <span class="text-primary text-sm font-semibold uppercase tracking-widest"
                        >Reach Out</span
                    >
                </div>
                <h2 class="reveal-item text-4xl md:text-5xl font-bold text-foreground">
                    Contact <em class="font-serif not-italic text-primary">Information</em>
                </h2>
            </div>

            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <!-- CONTACT DETAILS (5 cols) -->
                <div class="lg:col-span-5 reveal-group">
                    <h3 class="reveal-item text-2xl font-semibold mb-4 text-foreground">
                        Have any inquiries or concerns?
                    </h3>
                    <p class="reveal-item text-lg text-muted-foreground mb-4">
                        Fill out our form details to send us a message. We will get back to you as
                        soon as possible. Alternatively, you may visit our directory to contact the
                        offices/departments directly.
                    </p>
                    <p class="reveal-item text-lg text-muted-foreground mb-10">
                        Use "N/A" if information does not apply to you.
                    </p>

                    <div class="reveal-item space-y-4">
                        <div
                            class="flex items-start gap-4 p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/30 transition-colors duration-200"
                        >
                            <MapPin class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                            <div>
                                <p
                                    class="text-xs font-semibold text-foreground uppercase tracking-widest mb-1"
                                >
                                    Address
                                </p>
                                <p class="text-muted-foreground">
                                    St. Francis Xavier College<br />
                                    Agusan del Sur, Philippines
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/30 transition-colors duration-200"
                        >
                            <Phone class="w-6 h-6 text-primary shrink-0" />
                            <div>
                                <p
                                    class="text-xs font-semibold text-foreground uppercase tracking-widest mb-1"
                                >
                                    Phone
                                </p>
                                <p class="text-muted-foreground">+63 985 343 8327</p>
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/30 transition-colors duration-200"
                        >
                            <Mail class="w-6 h-6 text-primary shrink-0" />
                            <div>
                                <p
                                    class="text-xs font-semibold text-foreground uppercase tracking-widest mb-1"
                                >
                                    Email
                                </p>
                                <p class="text-muted-foreground">communications@sfxc.edu.ph</p>
                            </div>
                        </div>
                    </div>

                    <!-- SOCIAL MEDIA -->
                    <div class="reveal-item pt-8 border-t border-border mt-10">
                        <h4 class="text-lg font-bold text-foreground mb-4">Connect With Us</h4>
                        <div class="flex gap-4">
                            <a
                                href="https://www.facebook.com/StFrancisXavierCollegeADS"
                                target="_blank"
                                class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <img
                                    src="@/assets/images/socialmedia/facebook.svg"
                                    alt="Facebook"
                                    class="w-6 h-6"
                                />
                            </a>
                            <a
                                href="https://www.youtube.com/@StFrancisXavierCollegeSFADS"
                                target="_blank"
                                class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors duration-200"
                                aria-label="YouTube"
                            >
                                <img
                                    src="@/assets/images/socialmedia/youtube.svg"
                                    alt="YouTube"
                                    class="w-6 h-6"
                                />
                            </a>
                            <a
                                href="https://www.sfxc.edu.ph"
                                target="_blank"
                                class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-200"
                                aria-label="Website"
                            >
                                <Globe class="w-6 h-6 text-primary" />
                            </a>
                        </div>
                    </div>
                </div>

                <!-- CONTACT FORM (7 cols) -->
                <div class="lg:col-span-7 reveal-group">
                    <div class="bg-muted/20 p-8 rounded-2xl border border-border shadow-sm">
                        <form class="space-y-4" @submit.prevent>
                            <div class="reveal-item">
                                <label class="block text-sm font-medium mb-1.5 text-foreground"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    class="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors duration-200"
                                    required
                                />
                            </div>

                            <div class="grid sm:grid-cols-2 gap-4">
                                <div class="reveal-item">
                                    <label class="block text-sm font-medium mb-1.5 text-foreground"
                                        >ID Number</label
                                    >
                                    <input
                                        type="text"
                                        class="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors duration-200"
                                    />
                                </div>
                                <div class="reveal-item">
                                    <label class="block text-sm font-medium mb-1.5 text-foreground"
                                        >Year Level / Year Graduated</label
                                    >
                                    <input
                                        type="text"
                                        class="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            <div class="grid sm:grid-cols-2 gap-4">
                                <div class="reveal-item">
                                    <label class="block text-sm font-medium mb-1.5 text-foreground"
                                        >College</label
                                    >
                                    <select
                                        class="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors duration-200"
                                    >
                                        <option value="" disabled selected>Select College</option>
                                        <option>College of Business Education</option>
                                        <option>College of Criminal Justice Education</option>
                                        <option>College of Teacher Education</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div class="reveal-item">
                                    <label class="block text-sm font-medium mb-1.5 text-foreground"
                                        >Course</label
                                    >
                                    <select
                                        class="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors duration-200"
                                    >
                                        <option value="" disabled selected>Select Course</option>
                                        <option>
                                            Bachelor of Science in Information Technology
                                        </option>
                                        <option>
                                            Bachelor of Science in Business Administration
                                        </option>
                                        <option>Bachelor of Science in Accountancy</option>
                                        <option>
                                            Bachelor of Science in Office Administration
                                        </option>
                                        <option>Bachelor of Science in Criminology</option>
                                        <option>Bachelor of Science in Elementary Education</option>
                                        <option>Bachelor of Science in Secondary Education</option>
                                    </select>
                                </div>
                            </div>

                            <div class="reveal-item">
                                <label class="block text-sm font-medium mb-1.5 text-foreground"
                                    >Office or Department Concerned</label
                                >
                                <select
                                    class="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors duration-200"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Select Office/Department
                                    </option>
                                    <option>
                                        Accounting and Finance Office (including payments, property,
                                        and merchandise)
                                    </option>
                                    <option>Admission and Scholarship Office</option>
                                    <option>Auxiliary Office</option>
                                    <option>College of Business Education</option>
                                    <option>College of Criminal Justice Education</option>
                                    <option>College of Teacher Education</option>
                                    <option>Community Development Service Office</option>
                                    <option>Compliance and Quality Assurance Office</option>
                                    <option>Human Resources Office</option>
                                    <option>Information and Communication Office</option>
                                    <option>Library, or Learning Resource Center</option>
                                    <option>Marketing Office</option>
                                    <option>Office of Student Affairs and Services</option>
                                    <option>Registrar's Office</option>
                                    <option>Research Office</option>
                                    <option>Technical Vocational Office</option>
                                    <option>Campus Tour</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div class="reveal-item">
                                <label class="block text-sm font-medium mb-1.5 text-foreground"
                                    >Concern</label
                                >
                                <textarea
                                    rows="5"
                                    class="w-full p-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors duration-200"
                                    required
                                ></textarea>
                            </div>

                            <div class="reveal-item pt-2">
                                <button
                                    type="submit"
                                    class="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-semibold hover:bg-primary/90 transition-colors duration-200"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- OFFICE DIRECTORY -->
    <section id="directory" class="py-24 bg-muted/30 scroll-mt-16">
        <div class="container mx-auto px-4 md:px-8">
            <!-- Section Header -->
            <div
                class="reveal-group mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
                <div>
                    <div class="reveal-item flex items-center gap-3 mb-4">
                        <div class="w-8 h-0.5 bg-primary"></div>
                        <span class="text-primary text-sm font-semibold uppercase tracking-widest"
                            >Directory</span
                        >
                    </div>
                    <h2 class="reveal-item text-4xl md:text-5xl font-bold text-foreground">
                        Office <em class="font-serif not-italic text-primary">Directory</em>
                    </h2>
                </div>
                <img
                    src="@/assets/images/sfxc-logo-only.png"
                    alt="SFXC Logo"
                    class="reveal-item h-16 object-contain opacity-60"
                />
            </div>

            <!-- Directory Grid -->
            <div class="reveal-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Accounting -->
                <div
                    class="reveal-item bg-background rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                    <h3 class="text-lg font-bold text-primary mb-4 pb-3 border-b border-border">
                        Accounting Office
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Phone class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">0908 8854 520</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Mail class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground"
                                >accountingoffice@sfxc.edu.ph</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Finance -->
                <div
                    class="reveal-item bg-background rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                    <h3 class="text-lg font-bold text-primary mb-4 pb-3 border-b border-border">
                        Finance Office
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Phone class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">0908 8853 694</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Mail class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">financeoffice@sfxc.edu.ph</span>
                        </div>
                    </div>
                </div>

                <!-- Human Resources -->
                <div
                    class="reveal-item bg-background rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                    <h3 class="text-lg font-bold text-primary mb-4 pb-3 border-b border-border">
                        Human Resources Office
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Phone class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">0955 6206 455</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Mail class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">humanresources@sfxc.edu.ph</span>
                        </div>
                    </div>
                </div>

                <!-- ICO & Marketing -->
                <div
                    class="reveal-item bg-background rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                    <h3 class="text-lg font-bold text-primary mb-4 pb-3 border-b border-border">
                        ICO and Marketing Office
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Phone class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">0908 8855 380</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Mail class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">infocomm@sfxc.edu.ph</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Mail class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">marketing@sfxc.edu.ph</span>
                        </div>
                    </div>
                </div>

                <!-- OSAS & Guidance -->
                <div
                    class="reveal-item bg-background rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                    <h3 class="text-lg font-bold text-primary mb-4 pb-3 border-b border-border">
                        OSAS and Guidance Office
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Phone class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">0908 8856 201</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Mail class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">osas@sfxc.edu.ph</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Mail class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">guidanceoffice@sfxc.edu.ph</span>
                        </div>
                    </div>
                </div>

                <!-- Registrar -->
                <div
                    class="reveal-item bg-background rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                    <h3 class="text-lg font-bold text-primary mb-4 pb-3 border-b border-border">
                        Registrar Office
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Phone class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">09088853687</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <Mail class="w-4 h-4 text-primary" />
                            </div>
                            <span class="text-sm text-foreground">Registraroffice@sfxc.edu.ph</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.reveal-item {
    opacity: 0;
    transform: translateY(2rem);
    transition:
        opacity 0.6s ease,
        transform 0.6s ease;
}

.reveal-item.reveal-visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
