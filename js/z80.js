function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

var z80 = {
    
    _regs: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0, //Flags
        h: 0,
        l: 0,
        sp: 0,
        pc: 0
    },

    mmu: {
        codes: []
    },

    reset: function() {
        z80._regs.a = 0;
        z80._regs.b = 0;
        z80._regs.c = 0;
        z80._regs.d = 0;
        z80._regs.e = 0;
        z80._regs.f = 255;
        z80._regs.h = 0;
        z80._regs.l = 0;
        z80._regs.sp = 0;
        z80._regs.pc = 0;

        console.log('z80 Reset');
    },

    load: function(arr) {
        z80.mmu.codes = arr;
        // arr.forEach(function(item, i) {

        // });
    },

    run: function(afterOp) {
        z80.reset();
        if (z80.mmu.codes.length == 0) {
            console.log('Sorry, but you must load program to memory (use .load())');
            return;
        }

        console.log("Let's go!");

        while(z80._regs.pc < z80.mmu.codes.length) {
            //console.log('PC: ' + z80._regs.pc);
            z80.exec();
            console.log(dec2bin(z80._regs.f), dec2bin(z80._regs.f).length);
            
            if (afterOp) {
                afterOp();
            }
        }
    },

    exec: function() {
        op = z80._mapOps[z80.mmu.codes[z80._regs.pc]];
        if (op == null) {
            console.log('Warning! Command: '+z80.mmu.codes[z80._regs.pc] + '('+dec2bin(z80.mmu.codes[z80._regs.pc])+')');
            op = z80._ops.ZZ;
        }

        console.log('Operation: ' + op);
        z80._regs.pc++;
        op();
    },

    _ops: {
        /*--- Load/store ---*/
        LDrr_bb: function() { z80._regs.b=z80._regs.b; },
        LDrr_bc: function() { z80._regs.b=z80._regs.c; },
        LDrr_bd: function() { z80._regs.b=z80._regs.d; },
        LDrr_be: function() { z80._regs.b=z80._regs.e; },
        LDrr_bh: function() { z80._regs.b=z80._regs.h; },
        LDrr_bl: function() { z80._regs.b=z80._regs.l; },
        LDrr_ba: function() { z80._regs.b=z80._regs.a; },
        LDrr_cb: function() { z80._regs.c=z80._regs.b; },
        LDrr_cc: function() { z80._regs.c=z80._regs.c; },
        LDrr_cd: function() { z80._regs.c=z80._regs.d; },
        LDrr_ce: function() { z80._regs.c=z80._regs.e; },
        LDrr_ch: function() { z80._regs.c=z80._regs.h; },
        LDrr_cl: function() { z80._regs.c=z80._regs.l; },
        LDrr_ca: function() { z80._regs.c=z80._regs.a; },
        LDrr_db: function() { z80._regs.d=z80._regs.b; },
        LDrr_dc: function() { z80._regs.d=z80._regs.c; },
        LDrr_dd: function() { z80._regs.d=z80._regs.d; },
        LDrr_de: function() { z80._regs.d=z80._regs.e; },
        LDrr_dh: function() { z80._regs.d=z80._regs.h; },
        LDrr_dl: function() { z80._regs.d=z80._regs.l; },
        LDrr_da: function() { z80._regs.d=z80._regs.a; },
        LDrr_eb: function() { z80._regs.e=z80._regs.b; },
        LDrr_ec: function() { z80._regs.e=z80._regs.c; },
        LDrr_ed: function() { z80._regs.e=z80._regs.d; },
        LDrr_ee: function() { z80._regs.e=z80._regs.e; },
        LDrr_eh: function() { z80._regs.e=z80._regs.h; },
        LDrr_el: function() { z80._regs.e=z80._regs.l; },
        LDrr_ea: function() { z80._regs.e=z80._regs.a; },
        LDrr_hb: function() { z80._regs.h=z80._regs.b; },
        LDrr_hc: function() { z80._regs.h=z80._regs.c; },
        LDrr_hd: function() { z80._regs.h=z80._regs.d; },
        LDrr_he: function() { z80._regs.h=z80._regs.e; },
        LDrr_hh: function() { z80._regs.h=z80._regs.h; },
        LDrr_hl: function() { z80._regs.h=z80._regs.l; },
        LDrr_ha: function() { z80._regs.h=z80._regs.a; },
        LDrr_lb: function() { z80._regs.l=z80._regs.b; },
        LDrr_lc: function() { z80._regs.l=z80._regs.c; },
        LDrr_ld: function() { z80._regs.l=z80._regs.d; },
        LDrr_le: function() { z80._regs.l=z80._regs.e; },
        LDrr_lh: function() { z80._regs.l=z80._regs.h; },
        LDrr_ll: function() { z80._regs.l=z80._regs.l; },
        LDrr_la: function() { z80._regs.l=z80._regs.a; },
        LDrr_ab: function() { z80._regs.a=z80._regs.b; },
        LDrr_ac: function() { z80._regs.a=z80._regs.c; },
        LDrr_ad: function() { z80._regs.a=z80._regs.d; },
        LDrr_ae: function() { z80._regs.a=z80._regs.e; },
        LDrr_ah: function() { z80._regs.a=z80._regs.h; },
        LDrr_al: function() { z80._regs.a=z80._regs.l; },
        LDrr_aa: function() { z80._regs.a=z80._regs.a; },
        
        LDrn_a: function() {
            z80._regs.a = z80.mmu.codes[z80._regs.pc];
            z80._regs.pc++;
        },
        LDrn_b: function() {
            z80._regs.b = z80.mmu.codes[z80._regs.pc];
            z80._regs.pc++;
        },
        LDrn_c: function() {
            z80._regs.c = z80.mmu.codes[z80._regs.pc];
            z80._regs.pc++;
        },
        LDrn_d: function() {
            z80._regs.d = z80.mmu.codes[z80._regs.pc];
            z80._regs.pc++;
        },
        LDrn_e: function() {
            z80._regs.e = z80.mmu.codes[z80._regs.pc];
            z80._regs.pc++;
        },
        LDrn_h: function() {
            z80._regs.h = z80.mmu.codes[z80._regs.pc];
            z80._regs.pc++;
        },
        LDrn_l: function() {
            z80._regs.l = z80.mmu.codes[z80._regs.pc];
            z80._regs.pc++;
        },

        //ADD
        ADDn: function() {
            var a = z80._regs.a;
            var n = z80.mmu.codes[z80._regs.pc];
            
            z80._regs.a += n;
            
            z80._regs.f = 0;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a > 255)?0x01:0x00; //Carry flag
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((z80._regs.a ^ a) & (z80._regs.a ^ n) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
            
            if (((z80._regs.a & 0xf) + (n & 0xf)) & 0x10 != 0) {
                z80._regs.f |= 0x10; //HalfCarry flag. Maybe need correct. I don't know :)
            }

            z80._regs.pc++;
        },
        
        ADDr_a: function() {
            var n = z80._regs.a;
            
            z80._regs.a += n;
            
            z80._regs.f = 0;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a > 255)?0x01:0x00; //Carry flag
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((z80._regs.a ^ n) & (z80._regs.a ^ n) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
            if (((z80._regs.a & 0xf) + (n & 0xf)) & 0x10 != 0) {
                z80._regs.f |= 0x10; //HalfCarry flag. Maybe need correct. I don't know :)
            }
        },
        ADDr_b: function() {
            var a = z80._regs.a;        
            var n = z80._regs.b;
            
            z80._regs.a += n;
            
            z80._regs.f = 0;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a > 255)?0x01:0x00; //Carry flag
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((z80._regs.a ^ a) & (z80._regs.a ^ n) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
            if (((z80._regs.a & 0xf) + (n & 0xf)) & 0x10 != 0) {
                z80._regs.f |= 0x10; //HalfCarry flag. Maybe need correct. I don't know :)
            }
        },
        ADDr_c: function() {
            var a = z80._regs.a;        
            var n = z80._regs.c;
            
            z80._regs.a += n;
            
            z80._regs.f = 0;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a > 255)?0x01:0x00; //Carry flag
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((z80._regs.a ^ a) & (z80._regs.a ^ n) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
            if (((z80._regs.a & 0xf) + (n & 0xf)) & 0x10 != 0) {
                z80._regs.f |= 0x10; //HalfCarry flag. Maybe need correct. I don't know :)
            }
        },
        ADDr_d: function() {
            var a = z80._regs.a;        
            var n = z80._regs.d;
            
            z80._regs.a += n;
            
            z80._regs.f = 0;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a > 255)?0x01:0x00; //Carry flag
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((z80._regs.a ^ a) & (z80._regs.a ^ n) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
        },
        ADDr_e: function() {
            var a = z80._regs.a;        
            var n = z80._regs.e;
            
            z80._regs.a += n;
            
            z80._regs.f = 0;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a > 255)?0x01:0x00; //Carry flag
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((z80._regs.a ^ a) & (z80._regs.a ^ n) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
            if (((z80._regs.a & 0xf) + (n & 0xf)) & 0x10 != 0) {
                z80._regs.f |= 0x10; //HalfCarry flag. Maybe need correct. I don't know :)
            }
        },
        ADDr_h: function() {
            var a = z80._regs.a;        
            var n = z80._regs.h;
            
            z80._regs.a += n;
            
            z80._regs.f = 0;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a > 255)?0x01:0x00; //Carry flag
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((z80._regs.a ^ a) & (z80._regs.a ^ n) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
            if (((z80._regs.a & 0xf) + (n & 0xf)) & 0x10 != 0) {
                z80._regs.f |= 0x10; //HalfCarry flag. Maybe need correct. I don't know :)
            }
        },
        ADDr_l: function() {
            var a = z80._regs.a;        
            var n = z80._regs.l;
            
            z80._regs.a += n;
            
            z80._regs.f = 0;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a > 255)?0x01:0x00; //Carry flag
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((z80._regs.a ^ a) & (z80._regs.a ^ n) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
            if (((z80._regs.a & 0xf) + (n & 0xf)) & 0x10 != 0) {
                z80._regs.f |= 0x10; //HalfCarry flag. Maybe need correct. I don't know :)
            }
        },
        
        //SUB
        SUBn: function() {
            var a = z80._regs.a;
            var n = z80.mmu.codes[z80._regs.pc];
            
            z80._regs.a -= n;
            
            z80._regs.f = 0x02;
            z80._regs.f |= (!(z80._regs.a & 255))?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.a & 0x100)?0x01:0x00; //Carry flag.
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128); //Sign flag
            if (((a ^ n) & (a ^ z80._regs.a) & 0x80) != 0) {
                z80._regs.f |= 0x04; //Overflow flag
            }
            if (((z80._regs.a & 0xf) - (n & 0xf)) & 0x10 != 0) {
                z80._regs.f |= 0x10; //HalfCarry flag. Maybe need correct. I don't know :)
            }
            z80._regs.pc++;
        },

        //INC
        INCr_a: function() {
            z80._regs.a++;
            z80._regs.a &= 255;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= (!z80._regs.a)?0x40:0x00;
            z80._regs.f |= (z80._regs.a & 128);
        },
        INCr_b: function() {
            z80._regs.b++;
            z80._regs.b &= 255;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= (!z80._regs.b)?0x40:0x00;
            z80._regs.f |= (z80._regs.b & 128);
        },
        INCr_c: function() {
            z80._regs.c++;
            z80._regs.c &= 255;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= (!z80._regs.c)?0x40:0x00;
            z80._regs.f |= (z80._regs.c & 128);
        },
        INCr_d: function() {
            z80._regs.d++;
            z80._regs.d &= 255;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= (!z80._regs.d)?0x40:0x00;
            z80._regs.f |= (z80._regs.d & 128);
        },
        INCr_e: function() {
            z80._regs.e++;
            z80._regs.e &= 255;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= (!z80._regs.e)?0x40:0x00;
            z80._regs.f |= (z80._regs.e & 128);
        },
        INCr_h: function() {
            z80._regs.h++;
            z80._regs.h &= 255;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= (!z80._regs.h)?0x40:0x00;
            z80._regs.f |= (z80._regs.h & 128);
        },
        INCr_l: function() {
            z80._regs.l++;
            z80._regs.l &= 255;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= (!z80._regs.l)?0x40:0x00;
            z80._regs.f |= (z80._regs.l & 128);
        },

        DECr_a: function() {
            z80._regs.a--;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= 0x02;
            z80._regs.f |= (!z80._regs.a)?0x40:0x00;
            z80._regs.a &= 255;
            z80._regs.f |= (z80._regs.a & 128);
        },
        DECr_b: function() {
            z80._regs.b--;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= 0x02;
            z80._regs.f |= (!z80._regs.b)?0x40:0x00;
            z80._regs.b &= 255;
            z80._regs.f |= (z80._regs.b & 128);
        },
        DECr_c: function() {
            z80._regs.c--;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= 0x02;
            z80._regs.f |= (!z80._regs.c)?0x40:0x00;
            z80._regs.c &= 255;
            z80._regs.f |= (z80._regs.c & 128);
        },
        DECr_d: function() {
            z80._regs.d--;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= 0x02;
            z80._regs.f |= (!z80._regs.d)?0x40:0x00;
            z80._regs.d &= 255;
            z80._regs.f |= (z80._regs.d & 128);
        },
        DECr_e: function() {
            z80._regs.e--;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= 0x02;
            z80._regs.f |= (!z80._regs.e)?0x40:0x00;
            z80._regs.e &= 255;
            z80._regs.f |= (z80._regs.e & 128);
        },
        DECr_h: function() {
            z80._regs.h--;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= 0x02;
            z80._regs.f |= (!z80._regs.h)?0x40:0x00;
            z80._regs.h &= 255;
            z80._regs.f |= (z80._regs.h & 128);
        },
        DECr_l: function() {
            z80._regs.l--;
            z80._regs.f = (z80._regs.f & 1);
            z80._regs.f |= 0x02;
            z80._regs.f |= (!z80._regs.l)?0x40:0x00;
            z80._regs.l &= 255;
            z80._regs.f |= (z80._regs.l & 128);
        },
        
        
        ANDr_b: function() {
            z80._regs.a &= z80._regs.b;
            z80._regs.a &= 255;
            z80._regs.f = 0x08;
            z80._regs.f |= (!z80._regs.l)?0x40:0x00; //Zero flag
            z80._regs.f |= (z80._regs.l & 128); //Sign flag
        },

        ZZ: function() {
            console.log('Not implemented :(');
        }
    },


    _mapOps: [
        
    ],
}

z80._mapOps = [
        //00
        null, null, null, null,
        z80._ops.INCr_b, z80._ops.DECr_b, z80._ops.LDrn_b, null,
        null, null, null, null,
        z80._ops.INCr_c, z80._ops.DECr_c, z80._ops.LDrn_c, null,
        //10 (16)
        null, null, null, null,
        z80._ops.INCr_d, z80._ops.DECr_d, z80._ops.LDrn_d, null,
        null, null, null, null,
        z80._ops.INCr_e, z80._ops.DECr_e, z80._ops.LDrn_e, null,
        //20 (32)
        null, null, null, null,
        z80._ops.INCr_h, z80._ops.DECr_h, z80._ops.LDrn_h, null,
        null, null, null, null,
        z80._ops.INCr_l, z80._ops.DECr_l, z80._ops.LDrn_l, null,
        //30 (48)
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        z80._ops.INCr_a, z80._ops.DECr_a, z80._ops.LDrn_a, null,
        //40 (64)
        z80._ops.LDrr_bb, z80._ops.LDrr_bc, z80._ops.LDrr_bd, z80._ops.LDrr_be,
        z80._ops.LDrr_bh, z80._ops.LDrr_bl, null, z80._ops.LDrr_ba,
        z80._ops.LDrr_cb, z80._ops.LDrr_cc, z80._ops.LDrr_cd, z80._ops.LDrr_ce,
        z80._ops.LDrr_ch, z80._ops.LDrr_cl, null, z80._ops.LDrr_ca,
        //50 (80)
        z80._ops.LDrr_db, z80._ops.LDrr_dc, z80._ops.LDrr_dd, z80._ops.LDrr_de,
        z80._ops.LDrr_dh, z80._ops.LDrr_dl, null, z80._ops.LDrr_da,
        z80._ops.LDrr_eb, z80._ops.LDrr_ec, z80._ops.LDrr_ed, z80._ops.LDrr_ee,
        z80._ops.LDrr_eh, z80._ops.LDrr_el, null, z80._ops.LDrr_ea,
        //60 (96)
        z80._ops.LDrr_hb, z80._ops.LDrr_hc, z80._ops.LDrr_hd, z80._ops.LDrr_he,
        z80._ops.LDrr_hh, z80._ops.LDrr_hl, null, z80._ops.LDrr_ha,
        z80._ops.LDrr_lb, z80._ops.LDrr_lc, z80._ops.LDrr_ld, z80._ops.LDrr_le,
        z80._ops.LDrr_lh, z80._ops.LDrr_ll, null, z80._ops.LDrr_la,
        //70 (112)
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        //80 (128)
        z80._ops.ADDr_b, z80._ops.ADDr_c, z80._ops.ADDr_d, z80._ops.ADDr_e,
        z80._ops.ADDr_h, z80._ops.ADDr_l, null, z80._ops.ADDr_a,
        null, null, null, null,
        null, null, null, null,
        //90 (144)
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        //A0 (160)
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        //B0 (176)
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        //C0 (192)
        null, null, null, null,
        null, null, z80._ops.ADDn, null,
        null, null, null, null,
        null, null, null, null,
        //D0 (208)
        null, null, null, null,
        null, null, z80._ops.SUBn, null,
        null, null, null, null,
        null, null, null, null,
    ]
